import sqlite3
import pandas as pd

RAW_DATA_PATH = "data/BankChurn.csv"
CLEAN_CSV_PATH = "data/customers_clean.csv"
DB_PATH = "data/credit_card.db"


#remove naive_bayes columns, they are leftover modul outputs from the orginal dataset
#CLIENTNUM = an opaque ID with no predictive value

LEAK_COLUMNS =[c for c in[
    "Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_"
    "Dependent_count_Education_Level_Months_Inactive_12_mon_1", 
    "Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_"
    "Dependent_count_Education_Level_Months_Inactive_12_mon_2"]]

def load_clean(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)

    #drop leakage columns and CLIENTNUM
    df = df.drop(columns=[c for c in LEAK_COLUMNS if c in df.columns], errors='ignore')
    df = df.drop(columns=["CLIENTNUM"], errors='ignore')


    #binary target = 1 if the customer has churned, 0 otherwise
    df["churn"] = (df["Attrition_Flag"] == "Attrited Customer").astype(int)


    #tenure buckets: <2 years, 2-3 years, 3-4 years, >4 years
    df["tenure_bucket"] = pd.cut(
        df["Months_on_book"],
        bins=[0, 24, 36, 48, 100],
        labels=["<2 years", "2-3 years", "3-4 years", ">4 years"]
    )

    #utilization buckets: <10%, 10-30%, 30-60%, >60%
    df["utilization_bucket"] = pd.cut(
        df["Avg_Utilization_Ratio"],
        bins=[-0.01, 0.10, 0.30, 0.60, 1.01],
        labels=["Dormant (<10%)", "Light (10-30%)", "Active (30-60%)", "Heavy (>60%)"],
    )
    #spend per transaction
    df["avg_ticket"] = (df["Total_Trans_Amt"] / df["Total_Trans_Ct"]).round(2)
 
    return df    


def build(df: pd.DataFrame) -> None:
    df.to_csv(CLEAN_CSV_PATH, index=False)
    conn = sqlite3.connect(DB_PATH)
    df.to_sql("customers", conn, if_exists="replace", index=False)
    conn.commit()
    conn.close()
    print(f"Wrote {len(df):,} rows to {DB_PATH} (table: customers) and {CLEAN_CSV_PATH}")

DEMO_QUERIES = {
    "Overall churn rate": """
        SELECT ROUND(100.0 * AVG(churn), 1) AS churn_rate_pct,
               COUNT(*) AS customers
        FROM customers;
    """,
    "Churn rate by income band": """
        SELECT Income_Category,
               COUNT(*) AS customers,
               ROUND(100.0 * AVG(churn), 1) AS churn_rate_pct
        FROM customers
        GROUP BY Income_Category
        ORDER BY churn_rate_pct DESC;
    """,
    "Churn rate by number of products held": """
        SELECT Total_Relationship_Count AS products_held,
               COUNT(*) AS customers,
               ROUND(100.0 * AVG(churn), 1) AS churn_rate_pct
        FROM customers
        GROUP BY Total_Relationship_Count
        ORDER BY products_held;
    """,
    "Spend & activity: churned vs retained": """
        SELECT CASE churn WHEN 1 THEN 'Churned' ELSE 'Retained' END AS segment,
               ROUND(AVG(Total_Trans_Ct), 1)  AS avg_transactions,
               ROUND(AVG(Total_Trans_Amt), 0) AS avg_spend,
               ROUND(AVG(Avg_Utilization_Ratio), 3) AS avg_utilization
        FROM customers
        GROUP BY churn;
    """,
}    