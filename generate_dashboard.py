import json
import numpy as np
import pandas as pd
 
df = pd.read_csv("data/customers_scored.csv")
with open("data/model_metrics.json") as fh:
    metrics = json.load(fh)
 
n = len(df)
churn_rate = round(df["churn"].mean() * 100, 1)
 
kpis = {
    "total_customers": int(n),
    "churn_rate_pct": churn_rate,
    "avg_utilization": round(df["Avg_Utilization_Ratio"].mean(), 3),
    "avg_spend": int(df["Total_Trans_Amt"].mean()),
    "at_risk_count": int((df["risk_band"].isin(["High", "Critical"])).sum()),
}
 
 
def churn_by(col, order=None):
    g = (df.groupby(col)
           .agg(customers=("churn", "size"), churn_rate=("churn", lambda s: round(s.mean() * 100, 1)))
           .reset_index())
    
    if order:
        g[col] = pd.Categorical(g[col], categories=order, ordered=True)
        g = g.sort_values(col)

    g = g.rename(columns={col: "label"})
    return g.to_dict("records")
 
 
segments = (df.groupby("segment")
    .agg(size=("churn", "size"),
         
        churn_rate=("churn", lambda s: round(s.mean() * 100, 1)),
        avg_spend=("Total_Trans_Amt", lambda s: int(s.mean())),
        avg_trans=("Total_Trans_Ct", lambda s: round(s.mean(), 1)),
        avg_util=("Avg_Utilization_Ratio", lambda s: round(s.mean(), 3)),
        avg_products=("Total_Relationship_Count", lambda s: round(s.mean(), 1)))

    .reset_index()
    .sort_values("churn_rate")
    .to_dict("records"))
 
# Scatter sample: stratified by segment, ~120 per segment
scatter = []
for seg, sub in df.groupby("segment"):
    s = sub.sample(min(80, len(sub)), random_state=1)
    for _, r in s.iterrows():
        scatter.append({
            "x": int(r["Total_Trans_Ct"]),
            "y": round(float(r["Avg_Utilization_Ratio"]), 3),
            "seg": seg,
            "churn": int(r["churn"]),
        })
 
df = df.reset_index(drop=True)
df["cust_id"] = ["CUST-" + str(i).zfill(5) for i in range(1, n + 1)]
parts = [g.sample(min(35, len(g)), random_state=2) 
    for _, g in df.groupby("risk_band")]

sample = pd.concat(parts)

table = sample[["cust_id", "Customer_Age", "Income_Category", "Card_Category", "Total_Relationship_Count", "Total_Trans_Ct","Avg_Utilization_Ratio", "segment", "risk_score", "risk_band"]]
table.columns = ["id", "age", "income", "card", "products", "transactions", "utilization", "segment", "risk", "band"]
table = table.sort_values("risk", ascending=False).to_dict("records")
 

driver_map = {
    "Total_Trans_Ct": "Transaction count", "Total_Revolving_Bal": "Revolving balance",
    "Total_Relationship_Count": "Products held", "Total_Trans_Amt": "Total spend",
    "Total_Ct_Chng_Q4_Q1": "Activity change (Q4/Q1)", "Months_Inactive_12_mon": "Months inactive",
    "Total_Amt_Chng_Q4_Q1": "Spend change (Q4/Q1)", "Contacts_Count_12_mon": "Support contacts",
    "Gender_M": "Gender (M)", "Gender_F": "Gender (F)",
}


top_features = [{"feature": driver_map.get(k, k), "importance": round(v, 3)}
    for k, v in metrics["top_features"].items()]
 
risk_bands = (df["risk_band"].value_counts()
    .reindex(["Low", "Medium", "High", "Critical"]).fillna(0)
    .astype(int).to_dict())
 
payload = {
    "kpis": kpis,
    "segments": segments,
    "churn_by_products": churn_by("Total_Relationship_Count"),
    "churn_by_income": churn_by("Income_Category", order=["Less than $40K", "$40K - $60K", "$60K - $80K", "$80K - $120K", "$120K +", "Unknown"]),
    "churn_by_tenure": churn_by("tenure_bucket", order=["<2 yrs", "2-3 yrs", "3-4 yrs", "4+ yrs"]),
    "risk_bands": risk_bands,
    "scatter": scatter,
    "table": table,
    "model": {"logistic": metrics["logistic"], "xgboost": metrics["xgboost"], "top_features": top_features},
}
 
with open("data/dashboard_data.json", "w") as fh:
    json.dump(payload, fh, indent=2)
 
print("Wrote data/dashboard_data.json")
print("KPIs:", kpis)
print("Segments:", [s["segment"] for s in segments])
print("Scatter points:", len(scatter), "| Table rows:", len(table))