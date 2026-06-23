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