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

