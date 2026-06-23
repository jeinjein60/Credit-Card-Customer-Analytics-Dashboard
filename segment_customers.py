import sqlite3
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
 
DB_PATH = "data/credit_card.db"
OUT_CSV = "data/customers_segmented.csv"
 
#behavioral features to use for clustering
FEATURES = [
    "Total_Trans_Amt",
    "Total_Trans_Ct",
    "Avg_Utilization_Ratio",
    "Total_Revolving_Bal",
    "Total_Relationship_Count",
    "Months_Inactive_12_mon",
    "Total_Ct_Chng_Q4_Q1",
    "Credit_Limit",
]

def load():
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql_query("SELECT * FROM customers", conn)
    conn.close()
    return df

def choose_k(X):
    print("k   inertia      silhouette")
    results = {}
    for k in range(2, 8):
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X)
        sil = silhouette_score(X, labels)
        results[k] = sil
        print(f"{k}   {km.inertia_:>10.0f}   {sil:.3f}")
    return results

def name_segments(profile: pd.DataFrame) -> dict:

    """Assign four distinct names by ranking clusters, so no label repeats.
 
    Axes used:
      1. Spend  -> the top spender is 'High-Value Engaged'
      2. Among the rest, utilization separates revolvers from low-utilizers
      3. Among the two low-utilizers, churn separates at-risk from light users"""
    names = {}
    remaining = list(profile.index)
 
    #Highest spender = High-Value Engaged
    top_spend = profile.loc[remaining, "Total_Trans_Amt"].idxmax()
    names[top_spend] = "High-Value Engaged"
    remaining.remove(top_spend)
 
    #Highest utilization of the rest = Engaged Revolvers
    top_util = profile.loc[remaining, "Avg_Utilization_Ratio"].idxmax()
    names[top_util] = "Engaged Revolvers"
    remaining.remove(top_util)
 
    #Of the two low-utilization clusters, the higher-churn one is At-Risk
    higher_churn = profile.loc[remaining, "churn_rate_pct"].idxmax()
    names[higher_churn] = "Dormant At-Risk"
    remaining.remove(higher_churn)
 
    #Leftover = Light Multiproduct Users
    names[remaining[0]] = "Light Multiproduct Users"
    return names
 
 
def main():
    df = load()
    X = StandardScaler().fit_transform(df[FEATURES])
 
    print("=== Choosing k ===")
    sils = choose_k(X)
    k = max(sils, key=sils.get)
    
    if 4 in sils and sils[4] >= max(sils.values()) - 0.01:
        k = 4
    print(f"\nUsing k = {k}")
 
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    df["segment_id"] = km.fit_predict(X)
 
    profile = df.groupby("segment_id")[FEATURES].mean()
    profile["churn_rate_pct"] = (df.groupby("segment_id")["churn"].mean() * 100).round(1)
    profile["size"] = df.groupby("segment_id").size()
 
    names = name_segments(profile)
    df["segment"] = df["segment_id"].map(names)
    profile["segment"] = profile.index.map(names)
 
    print("\n=== SEGMENT PROFILES ===")
    show = profile[["segment", "size", "churn_rate_pct", "Total_Trans_Amt", "Total_Trans_Ct", "Avg_Utilization_Ratio","Total_Relationship_Count", "Months_Inactive_12_mon"]]
    print(show.round(2).to_string(index=False))
 
    df.to_csv(OUT_CSV, index=False)
    print(f"\nWrote {len(df):,} rows with segment labels -> {OUT_CSV}")
 
 
if __name__ == "__main__":
    main()