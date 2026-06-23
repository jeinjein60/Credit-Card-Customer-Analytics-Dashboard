import json
import sqlite3
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (roc_auc_score, precision_score, recall_score,
                             f1_score, confusion_matrix, classification_report)
from xgboost import XGBClassifier
 
DATA = "data/customers_segmented.csv"
SCORED_CSV = "data/customers_scored.csv"
METRICS_JSON = "data/model_metrics.json"
 
NUMERIC = ["Customer_Age", "Dependent_count", "Months_on_book",
        "Total_Relationship_Count", "Months_Inactive_12_mon",
        "Contacts_Count_12_mon", "Credit_Limit", "Total_Revolving_Bal",
        "Avg_Open_To_Buy", "Total_Amt_Chng_Q4_Q1", "Total_Trans_Amt",
        "Total_Trans_Ct", "Total_Ct_Chng_Q4_Q1", "Avg_Utilization_Ratio"]


CATEGORICAL = ["Gender", "Education_Level", "Marital_Status", "Income_Category", "Card_Category"]
 
 
def evaluate(name, y_true, y_pred, y_prob):
    return {
        "model": name,
        "precision": round(precision_score(y_true, y_pred), 3),
        "recall": round(recall_score(y_true, y_pred), 3),
        "f1": round(f1_score(y_true, y_pred), 3),
        "roc_auc": round(roc_auc_score(y_true, y_prob), 3),
        "confusion_matrix": confusion_matrix(y_true, y_pred).tolist(),
    }
 
 
def main():
    df = pd.read_csv(DATA)
    X = df[NUMERIC + CATEGORICAL]
    y = df["churn"]
 
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
 
    pre = ColumnTransformer([("num", StandardScaler(), NUMERIC),("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL),])
 
    #model 1: Logistic Regression
    logit = Pipeline([("pre", pre), ("clf", LogisticRegression(max_iter=2000, class_weight="balanced"))])
    logit.fit(X_tr, y_tr)
    lp = logit.predict(X_te)
    lpr = logit.predict_proba(X_te)[:, 1]
    m_logit = evaluate("Logistic Regression", y_te, lp, lpr)
 
    #model 2: XGBoost
    spw = (y_tr == 0).sum() / (y_tr == 1).sum()
    xgb = Pipeline([("pre", pre),
                    ("clf", XGBClassifier(n_estimators=300, max_depth=4, learning_rate=0.05, subsample=0.9, colsample_bytree=0.9, scale_pos_weight=spw, eval_metric="logloss", random_state=42))])
    
    xgb.fit(X_tr, y_tr)
    xp = xgb.predict(X_te)
    xpr = xgb.predict_proba(X_te)[:, 1]
    m_xgb = evaluate("XGBoost", y_te, xp, xpr)
 
    print(" MODEL COMPARISON ")
    comp = pd.DataFrame([m_logit, m_xgb]).drop(columns="confusion_matrix")
    print(comp.to_string(index=False))
 
    print("\nXGBoost confusion matrix")
    cm = np.array(m_xgb["confusion_matrix"])
    print(pd.DataFrame(cm, index=["Stayed", "Churned"], columns=["Pred Stay", "Pred Churn"]).to_string())
 
    print("\n=== XGBoost classification report ===")
    print(classification_report(y_te, xp, target_names=["Stayed", "Churned"]))
 
    #pick stronger model and score all customers
    best, best_pipe = (m_xgb, xgb) if m_xgb["roc_auc"] >= m_logit["roc_auc"] else (m_logit, logit)
    print(f"Best model: {best['model']} (AUC={best['roc_auc']})")
 
    df["risk_score"] = best_pipe.predict_proba(X)[:, 1].round(4)
    df["risk_band"] = pd.cut(df["risk_score"], bins=[-0.01, 0.25, 0.50, 0.75, 1.01], labels=["Low", "Medium", "High", "Critical"])
 
    
    feat_names = (NUMERIC +
                  list(best_pipe.named_steps["pre"]
                       .named_transformers_["cat"]
                       .get_feature_names_out(CATEGORICAL))) \
        if best["model"] == "XGBoost" else None
    
    top_features = []
    if feat_names is not None:
        imp = best_pipe.named_steps["clf"].feature_importances_
        top_features = (pd.Series(imp, index=feat_names)
                        .sort_values(ascending=False).head(10)
                        .round(4).to_dict())
        print("\nTop 10 churn drivers")
        for f, v in top_features.items():
            print(f"  {f:<28} {v}")
 
    df.to_csv(SCORED_CSV, index=False)
    with open(METRICS_JSON, "w") as fh:
        json.dump({"logistic": m_logit, "xgboost": m_xgb,
                "best": best["model"], "top_features": top_features},
                fh, indent=2)
        
    print(f"\nScored {len(df):,} customers -> {SCORED_CSV}")
    print(f"Risk band counts:\n{df['risk_band'].value_counts().to_string()}")
 
 
if __name__ == "__main__":
    main()