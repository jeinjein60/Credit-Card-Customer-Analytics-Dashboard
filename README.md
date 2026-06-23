
# Credit Card Customer Analytics
An end-to-end analytics project on a portfolio of 10,127 credit-card customers: exploratory analysis with SQL and Python, behavioral segmentation, a predictive churn model, and an interactive React dashboard that turns the findings into prioritized retention strategy.

Languages: Python, Pandas, SQLite (SQL), scikit-learn, XGBoost, React and Recharts

---

## The question

Card issuers lose money when customers go quiet and eventually close their accounts. This project answers three things from the data alone: **who is leaving, why, and what to do about it.**

## Headline findings

- **Churn is concentrated, not spread out.** The overall churn rate is **16.1%**, but it collapses into a single behavioral group, a *Dormant At-Risk* segment that is **30% of all customers and churns at 33%**. Almost all preventable attrition lives here.
- **Relationship depth beats wealth.** The strongest lever on churn is how many products a customer holds **25.6% churn with 1 product vs. 10.5% with 6**, while income barely moves the needle (everything sits between 13.5% and 17.3%).
- **Churn is a disengagement story.** Customers who left were transacting far less (45 vs. 69 transactions/yr), carried lower revolving balances ($673 vs. $1,257), and contacted support more often a friction signal that shows up before they leave.

## The dashboard

A self-contained React app with four views:

| View | What it shows |
|------|----------------|
| **Overview** | Portfolio KPIs, churn by products held, churn by income, predicted risk distribution |
| **Segments** | The four-segment "churn risk spectrum" and a behavior map (utilization vs. activity) |
| **Churn Risk** | Model comparison, confusion matrix, top churn drivers, and a sortable/filterable customer risk register |
| **Retention** | Prioritized playbooks mapping each segment to a concrete retention action |

> _Add a screenshot here once hosted:_ `![Dashboard](docs/dashboard.png)`

## Customer segmentation (K-Means, k=4)

Clusters were built on **behavior only**, churn was deliberately excluded so it could be used to *validate* the segments. The fact that churn ranges from 4% to 33% across the clusters confirms they capture something real.

| Segment | Size | Churn | Avg spend | Utilization | Read |
|---|---|---|---|---|---|
| High-Value Engaged | 1,175 | 4.0% | $12,273 | 17% | Top spenders — protect, don't over-invest |
| Engaged Revolvers | 4,236 | 8.2% | $3,513 | 54% | Profitable, sticky core |
| Light Multiproduct Users | 1,656 | 12.9% | $3,035 | 7% | Several products, light use |
| **Dormant At-Risk** | **3,060** | **33.3%** | $3,357 | 5% | **Primary retention target** |

## Churn model

Two models were trained on a stratified 80/20 split and evaluated on **precision, recall, F1, and ROC-AUC** — not accuracy, since the classes are imbalanced (~16% churn).

| Metric | Logistic Regression | XGBoost |
|---|---|---|
| Precision | 0.531 | **0.872** |
| Recall | 0.818 | **0.920** |
| F1 | 0.644 | **0.895** |
| ROC-AUC | 0.921 | **0.993** |

XGBoost catches **299 of 325** churners in the test set (92% recall) while keeping false alarms low. The top drivers: transaction count, revolving balance, products held, total spend, and quarter-over-quarter activity change, match the EDA story exactly.

Each customer is scored with a 0–1 risk probability and bucketed into Low / Medium / High / Critical bands that feed the dashboard.

## Limitations & responsible use

- **The 0.99 AUC is a property of this benchmark dataset, not a realistic target.** The features separate churners almost perfectly; production churn models on noisier, real-world signals typically land around **0.75–0.85 AUC**. This is stated plainly because overclaiming would be misleading.
- **Protected attributes need scrutiny.** Gender appeared with mild importance in the model. In any production or fair-lending context it would be removed and the model audited for disparate impact — predictive lift never justifies using a protected class as a feature.
- This is a learning project on public data; it is not a deployed system.

## Reproduce it

```bash
pip install pandas numpy scikit-learn xgboost

python build_database.py          # 1. clean CSV -> SQLite + engineered features
python segment_customers.py       # 2. K-Means segmentation
python train_model.py             # 3. train + compare churn models, score customers
python generate_dashboard.py # 4. roll up aggregates -> dashboard_data.json
```

Then for the dashboard:

```bash
npm create vite@latest my-dashboard -- --template react
cd my-dashboard

npm install recharts
npm run dev
# import CreditDashboard.jsx into a React app (Vite/CRA/Next)
```

## Repository structure

```
.
├── data/
│   ├── BankChurners.csv          # raw input (from Kaggle)
│   ├── customers_clean.csv       # cleaned, feature-engineered
│   ├── customers_segmented.csv   # + segment labels
│   ├── customers_scored.csv      # + risk_score / risk_band
│   ├── credit_card.db            # SQLite database
│   ├── model_metrics.json        # model evaluation results
│   └── dashboard_data.json       # compact payload for the dashboard
├── database.py
├── segment_customers.py
├── train_model.py
├── generate_dashboard.py
├── credit_dashboard.jsx           # interactive React dashboard
└── README.md
```

## Dataset

[Credit Card Customers](https://www.kaggle.com/datasets/sakshigoyal7/credit-card-customers) (BankChurners), Kaggle — 10,127 customers with demographics, account, and transaction-behavior fields. The two leftover `Naive_Bayes_Classifier_*` columns and `CLIENTNUM` are dropped during cleaning.

## Possible extensions

- SHAP values for per-customer explanations of *why* someone is flagged
- Calibrated probabilities so risk scores map to real churn likelihoods
- A simple A/B framework to measure whether the retention plays actually move the needle
