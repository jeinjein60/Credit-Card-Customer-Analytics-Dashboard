// React

import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ScatterChart, Scatter, ZAxis, Legend,
} from "recharts";

const DATA = {
  "kpis": {
    "total_customers": 10127,
    "churn_rate_pct": 16.1,
    "avg_utilization": 0.275,
    "avg_spend": 4404,
    "at_risk_count": 1766
  },
  "segments": [
    {
      "segment": "High-Value Engaged",
      "size": 1175,
      "churn_rate": 4.0,
      "avg_spend": 12273,
      "avg_trans": 102.9,
      "avg_util": 0.17,
      "avg_products": 2.1
    },
    {
      "segment": "Engaged Revolvers",
      "size": 4236,
      "churn_rate": 8.2,
      "avg_spend": 3512,
      "avg_trans": 62.7,
      "avg_util": 0.543,
      "avg_products": 4.1
    },
    {
      "segment": "Light Multiproduct Users",
      "size": 1656,
      "churn_rate": 12.9,
      "avg_spend": 3034,
      "avg_trans": 55.1,
      "avg_util": 0.074,
      "avg_products": 4.3
    },
    {
      "segment": "Dormant At-Risk",
      "size": 3060,
      "churn_rate": 33.3,
      "avg_spend": 3357,
      "avg_trans": 58.6,
      "avg_util": 0.052,
      "avg_products": 3.8
    }
  ],
  "churn_by_products": [
    {
      "label": 1,
      "customers": 910,
      "churn_rate": 25.6
    },
    {
      "label": 2,
      "customers": 1243,
      "churn_rate": 27.8
    },
    {
      "label": 3,
      "customers": 2305,
      "churn_rate": 17.4
    },
    {
      "label": 4,
      "customers": 1912,
      "churn_rate": 11.8
    },
    {
      "label": 5,
      "customers": 1891,
      "churn_rate": 12.0
    },
    {
      "label": 6,
      "customers": 1866,
      "churn_rate": 10.5
    }
  ],
  "churn_by_income": [
    {
      "label": "Less than $40K",
      "customers": 3561,
      "churn_rate": 17.2
    },
    {
      "label": "$40K - $60K",
      "customers": 1790,
      "churn_rate": 15.1
    },
    {
      "label": "$60K - $80K",
      "customers": 1402,
      "churn_rate": 13.5
    },
    {
      "label": "$80K - $120K",
      "customers": 1535,
      "churn_rate": 15.8
    },
    {
      "label": "$120K +",
      "customers": 727,
      "churn_rate": 17.3
    },
    {
      "label": "Unknown",
      "customers": 1112,
      "churn_rate": 16.8
    }
  ],
  "churn_by_tenure": [
    {
      "label": "<2 yrs",
      "customers": 847,
      "churn_rate": 14.9
    },
    {
      "label": "2-3 yrs",
      "customers": 5418,
      "churn_rate": 16.1
    },
    {
      "label": "3-4 yrs",
      "customers": 3207,
      "churn_rate": 16.2
    },
    {
      "label": "4+ yrs",
      "customers": 655,
      "churn_rate": 16.9
    }
  ],
  "risk_bands": {
    "Low": 8104,
    "Medium": 257,
    "High": 161,
    "Critical": 1605
  },
  "scatter": [
    {
      "x": 53,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 71,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 18,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 18,
      "y": 0.152,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 69,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.097,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 60,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.153,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 37,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 77,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 63,
      "y": 0.096,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 50,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 67,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 76,
      "y": 0.213,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 42,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 69,
      "y": 0.092,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 41,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 75,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 53,
      "y": 0.219,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.112,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 43,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 63,
      "y": 0.061,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 85,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 37,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 36,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 32,
      "y": 0.201,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 18,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 41,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 72,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 89,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 26,
      "y": 0.142,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 41,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 69,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 50,
      "y": 0.08,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 74,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.063,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 67,
      "y": 0.203,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 84,
      "y": 0.097,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 21,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 59,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 89,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 38,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 65,
      "y": 0.208,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 67,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 34,
      "y": 0.155,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 31,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 32,
      "y": 0.081,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 59,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 28,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 79,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 28,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 82,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 83,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 51,
      "y": 0.206,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 21,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 73,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 85,
      "y": 0.169,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.107,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 56,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 42,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 48,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 39,
      "y": 0.118,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 52,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 64,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 38,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 65,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 94,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 18,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 48,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 75,
      "y": 0.124,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 0
    },
    {
      "x": 10,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 42,
      "y": 0.0,
      "seg": "Dormant At-Risk",
      "churn": 1
    },
    {
      "x": 58,
      "y": 0.304,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.58,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 59,
      "y": 0.442,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 76,
      "y": 0.336,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 61,
      "y": 0.599,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.653,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 92,
      "y": 0.646,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.718,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 40,
      "y": 0.259,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 33,
      "y": 0.792,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.235,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 78,
      "y": 0.739,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 87,
      "y": 0.411,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.857,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 80,
      "y": 0.833,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 88,
      "y": 0.645,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.204,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 25,
      "y": 0.551,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 49,
      "y": 0.814,
      "seg": "Engaged Revolvers",
      "churn": 1
    },
    {
      "x": 58,
      "y": 0.873,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 91,
      "y": 0.618,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 72,
      "y": 0.395,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 86,
      "y": 0.517,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.532,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 94,
      "y": 0.901,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 85,
      "y": 0.429,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 66,
      "y": 0.44,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 41,
      "y": 0.379,
      "seg": "Engaged Revolvers",
      "churn": 1
    },
    {
      "x": 69,
      "y": 0.264,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 84,
      "y": 0.518,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 58,
      "y": 0.203,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 64,
      "y": 0.747,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.618,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 55,
      "y": 0.584,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 80,
      "y": 0.494,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 86,
      "y": 0.65,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.261,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.834,
      "seg": "Engaged Revolvers",
      "churn": 1
    },
    {
      "x": 62,
      "y": 0.389,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 82,
      "y": 0.51,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 55,
      "y": 0.461,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.69,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 31,
      "y": 0.651,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 85,
      "y": 0.363,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 58,
      "y": 0.571,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 36,
      "y": 0.761,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.414,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 86,
      "y": 0.835,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 76,
      "y": 0.668,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 38,
      "y": 0.488,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 66,
      "y": 0.71,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 87,
      "y": 0.873,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 67,
      "y": 0.305,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.643,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 32,
      "y": 0.611,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 86,
      "y": 0.17,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 89,
      "y": 0.617,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.581,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 70,
      "y": 0.335,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.235,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 46,
      "y": 0.213,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 84,
      "y": 0.617,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.351,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 57,
      "y": 0.6,
      "seg": "Engaged Revolvers",
      "churn": 1
    },
    {
      "x": 30,
      "y": 0.439,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.223,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 56,
      "y": 0.731,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 44,
      "y": 0.375,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 37,
      "y": 0.221,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.714,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 69,
      "y": 0.506,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.305,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 82,
      "y": 0.561,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 72,
      "y": 0.187,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.905,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 82,
      "y": 0.505,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 68,
      "y": 0.495,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 82,
      "y": 0.525,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 26,
      "y": 0.275,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 90,
      "y": 0.366,
      "seg": "Engaged Revolvers",
      "churn": 0
    },
    {
      "x": 101,
      "y": 0.151,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 129,
      "y": 0.422,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 111,
      "y": 0.437,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 110,
      "y": 0.214,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 104,
      "y": 0.411,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 94,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 124,
      "y": 0.047,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 104,
      "y": 0.251,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 106,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 97,
      "y": 0.061,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 127,
      "y": 0.083,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 91,
      "y": 0.105,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 116,
      "y": 0.063,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 120,
      "y": 0.345,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 100,
      "y": 0.217,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 103,
      "y": 0.553,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 113,
      "y": 0.048,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 97,
      "y": 0.046,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 109,
      "y": 0.595,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 113,
      "y": 0.03,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 126,
      "y": 0.216,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 99,
      "y": 0.121,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 131,
      "y": 0.136,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.192,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 114,
      "y": 0.458,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 88,
      "y": 0.439,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 88,
      "y": 0.09,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 92,
      "y": 0.031,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.141,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 95,
      "y": 0.23,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 95,
      "y": 0.043,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 96,
      "y": 0.705,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 87,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 1
    },
    {
      "x": 117,
      "y": 0.104,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 105,
      "y": 0.737,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.234,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 105,
      "y": 0.112,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 116,
      "y": 0.254,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 105,
      "y": 0.074,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 101,
      "y": 0.045,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 129,
      "y": 0.609,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 122,
      "y": 0.077,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 93,
      "y": 0.249,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 95,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 103,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 91,
      "y": 0.044,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 102,
      "y": 0.18,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 108,
      "y": 0.607,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 108,
      "y": 0.042,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 79,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 1
    },
    {
      "x": 132,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 126,
      "y": 0.089,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 126,
      "y": 0.045,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 98,
      "y": 0.05,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 113,
      "y": 0.036,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 120,
      "y": 0.218,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 119,
      "y": 0.366,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 84,
      "y": 0.234,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 101,
      "y": 0.467,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 112,
      "y": 0.259,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 58,
      "y": 0.031,
      "seg": "High-Value Engaged",
      "churn": 1
    },
    {
      "x": 76,
      "y": 0.032,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 110,
      "y": 0.053,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 116,
      "y": 0.45,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 110,
      "y": 0.07,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 96,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 124,
      "y": 0.151,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 104,
      "y": 0.075,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 105,
      "y": 0.148,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 93,
      "y": 0.226,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 115,
      "y": 0.2,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.283,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 96,
      "y": 0.0,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 97,
      "y": 0.254,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 106,
      "y": 0.148,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 97,
      "y": 0.06,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.063,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 109,
      "y": 0.249,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 103,
      "y": 0.057,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 122,
      "y": 0.37,
      "seg": "High-Value Engaged",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.037,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 90,
      "y": 0.051,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 57,
      "y": 0.17,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 64,
      "y": 0.117,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 62,
      "y": 0.063,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 63,
      "y": 0.057,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 87,
      "y": 0.056,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 78,
      "y": 0.034,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 72,
      "y": 0.117,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 25,
      "y": 0.165,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 52,
      "y": 0.085,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 40,
      "y": 0.145,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.028,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 63,
      "y": 0.048,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 67,
      "y": 0.091,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 40,
      "y": 0.07,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 24,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 33,
      "y": 0.035,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 91,
      "y": 0.071,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 58,
      "y": 0.061,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 38,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 71,
      "y": 0.041,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 37,
      "y": 0.108,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 69,
      "y": 0.05,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 62,
      "y": 0.103,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 53,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 55,
      "y": 0.14,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.07,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 26,
      "y": 0.221,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 72,
      "y": 0.145,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 43,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 69,
      "y": 0.12,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 54,
      "y": 0.045,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 13,
      "y": 0.03,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 77,
      "y": 0.099,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 48,
      "y": 0.073,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 66,
      "y": 0.09,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 34,
      "y": 0.165,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 44,
      "y": 0.077,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 40,
      "y": 0.068,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 47,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 64,
      "y": 0.038,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 24,
      "y": 0.135,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 34,
      "y": 0.042,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 44,
      "y": 0.077,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 38,
      "y": 0.049,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 36,
      "y": 0.048,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 28,
      "y": 0.087,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 41,
      "y": 0.041,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 67,
      "y": 0.019,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 34,
      "y": 0.071,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 68,
      "y": 0.049,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 81,
      "y": 0.057,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 26,
      "y": 0.059,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 41,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 72,
      "y": 0.048,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 31,
      "y": 0.161,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 71,
      "y": 0.033,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.113,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 49,
      "y": 0.117,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 86,
      "y": 0.047,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 74,
      "y": 0.079,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 43,
      "y": 0.067,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 61,
      "y": 0.089,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 73,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 27,
      "y": 0.117,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 87,
      "y": 0.06,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 61,
      "y": 0.031,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 29,
      "y": 0.096,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 72,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 91,
      "y": 0.108,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 76,
      "y": 0.073,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 76,
      "y": 0.042,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 68,
      "y": 0.077,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 25,
      "y": 0.2,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 52,
      "y": 0.112,
      "seg": "Light Multiproduct Users",
      "churn": 1
    },
    {
      "x": 37,
      "y": 0.108,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 31,
      "y": 0.14,
      "seg": "Light Multiproduct Users",
      "churn": 0
    },
    {
      "x": 22,
      "y": 0.0,
      "seg": "Light Multiproduct Users",
      "churn": 0
    }
  ],
  "table": [
    {
      "id": "CUST-09018",
      "age": 44,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 1,
      "transactions": 42,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9981,
      "band": "Critical"
    },
    {
      "id": "CUST-08012",
      "age": 46,
      "income": "Unknown",
      "card": "Blue",
      "products": 2,
      "transactions": 41,
      "utilization": 0.124,
      "segment": "Dormant At-Risk",
      "risk": 0.998,
      "band": "Critical"
    },
    {
      "id": "CUST-07605",
      "age": 42,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 41,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9979,
      "band": "Critical"
    },
    {
      "id": "CUST-08815",
      "age": 49,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 2,
      "transactions": 53,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9969,
      "band": "Critical"
    },
    {
      "id": "CUST-09777",
      "age": 52,
      "income": "$80K - $120K",
      "card": "Silver",
      "products": 4,
      "transactions": 40,
      "utilization": 0.022,
      "segment": "Light Multiproduct Users",
      "risk": 0.9966,
      "band": "Critical"
    },
    {
      "id": "CUST-03695",
      "age": 38,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 2,
      "transactions": 36,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9965,
      "band": "Critical"
    },
    {
      "id": "CUST-09688",
      "age": 52,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 62,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9963,
      "band": "Critical"
    },
    {
      "id": "CUST-04864",
      "age": 49,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 45,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9962,
      "band": "Critical"
    },
    {
      "id": "CUST-06398",
      "age": 49,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 39,
      "utilization": 0.726,
      "segment": "Engaged Revolvers",
      "risk": 0.9947,
      "band": "Critical"
    },
    {
      "id": "CUST-06784",
      "age": 50,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 44,
      "utilization": 0.633,
      "segment": "Engaged Revolvers",
      "risk": 0.9937,
      "band": "Critical"
    },
    {
      "id": "CUST-05252",
      "age": 46,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 1,
      "transactions": 39,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9937,
      "band": "Critical"
    },
    {
      "id": "CUST-04998",
      "age": 42,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 46,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9929,
      "band": "Critical"
    },
    {
      "id": "CUST-05314",
      "age": 36,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 4,
      "transactions": 33,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.992,
      "band": "Critical"
    },
    {
      "id": "CUST-03693",
      "age": 41,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 1,
      "transactions": 41,
      "utilization": 0.951,
      "segment": "Engaged Revolvers",
      "risk": 0.9883,
      "band": "Critical"
    },
    {
      "id": "CUST-07812",
      "age": 38,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 2,
      "transactions": 48,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9868,
      "band": "Critical"
    },
    {
      "id": "CUST-04367",
      "age": 55,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 54,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9864,
      "band": "Critical"
    },
    {
      "id": "CUST-05026",
      "age": 43,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 36,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9864,
      "band": "Critical"
    },
    {
      "id": "CUST-08343",
      "age": 46,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 4,
      "transactions": 38,
      "utilization": 0.473,
      "segment": "Engaged Revolvers",
      "risk": 0.984,
      "band": "Critical"
    },
    {
      "id": "CUST-05856",
      "age": 58,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 41,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9822,
      "band": "Critical"
    },
    {
      "id": "CUST-04816",
      "age": 41,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 44,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9821,
      "band": "Critical"
    },
    {
      "id": "CUST-03562",
      "age": 47,
      "income": "Unknown",
      "card": "Blue",
      "products": 1,
      "transactions": 52,
      "utilization": 0.134,
      "segment": "Light Multiproduct Users",
      "risk": 0.9792,
      "band": "Critical"
    },
    {
      "id": "CUST-05669",
      "age": 44,
      "income": "$120K +",
      "card": "Blue",
      "products": 4,
      "transactions": 37,
      "utilization": 0.318,
      "segment": "Engaged Revolvers",
      "risk": 0.9776,
      "band": "Critical"
    },
    {
      "id": "CUST-03383",
      "age": 52,
      "income": "$120K +",
      "card": "Blue",
      "products": 1,
      "transactions": 36,
      "utilization": 0.026,
      "segment": "Light Multiproduct Users",
      "risk": 0.9771,
      "band": "Critical"
    },
    {
      "id": "CUST-10025",
      "age": 50,
      "income": "$120K +",
      "card": "Blue",
      "products": 1,
      "transactions": 56,
      "utilization": 0.05,
      "segment": "Light Multiproduct Users",
      "risk": 0.9692,
      "band": "Critical"
    },
    {
      "id": "CUST-01795",
      "age": 59,
      "income": "$120K +",
      "card": "Blue",
      "products": 1,
      "transactions": 23,
      "utilization": 0.051,
      "segment": "Dormant At-Risk",
      "risk": 0.9611,
      "band": "Critical"
    },
    {
      "id": "CUST-06346",
      "age": 33,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 5,
      "transactions": 43,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9603,
      "band": "Critical"
    },
    {
      "id": "CUST-08237",
      "age": 39,
      "income": "Unknown",
      "card": "Blue",
      "products": 6,
      "transactions": 44,
      "utilization": 0.446,
      "segment": "Engaged Revolvers",
      "risk": 0.9589,
      "band": "Critical"
    },
    {
      "id": "CUST-09231",
      "age": 31,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 77,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9511,
      "band": "Critical"
    },
    {
      "id": "CUST-08758",
      "age": 50,
      "income": "$120K +",
      "card": "Blue",
      "products": 4,
      "transactions": 50,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9474,
      "band": "Critical"
    },
    {
      "id": "CUST-05103",
      "age": 39,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 42,
      "utilization": 0.616,
      "segment": "Engaged Revolvers",
      "risk": 0.9468,
      "band": "Critical"
    },
    {
      "id": "CUST-02272",
      "age": 48,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 3,
      "transactions": 46,
      "utilization": 0.063,
      "segment": "Dormant At-Risk",
      "risk": 0.934,
      "band": "Critical"
    },
    {
      "id": "CUST-05660",
      "age": 59,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 53,
      "utilization": 0.132,
      "segment": "Dormant At-Risk",
      "risk": 0.925,
      "band": "Critical"
    },
    {
      "id": "CUST-01063",
      "age": 58,
      "income": "Unknown",
      "card": "Blue",
      "products": 4,
      "transactions": 32,
      "utilization": 0.119,
      "segment": "Light Multiproduct Users",
      "risk": 0.9205,
      "band": "Critical"
    },
    {
      "id": "CUST-04388",
      "age": 40,
      "income": "Unknown",
      "card": "Blue",
      "products": 3,
      "transactions": 33,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.9051,
      "band": "Critical"
    },
    {
      "id": "CUST-06285",
      "age": 36,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 63,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.7901,
      "band": "Critical"
    },
    {
      "id": "CUST-02297",
      "age": 35,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 34,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.7229,
      "band": "High"
    },
    {
      "id": "CUST-05554",
      "age": 62,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 52,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.719,
      "band": "High"
    },
    {
      "id": "CUST-06358",
      "age": 61,
      "income": "Unknown",
      "card": "Blue",
      "products": 4,
      "transactions": 46,
      "utilization": 0.234,
      "segment": "Dormant At-Risk",
      "risk": 0.7099,
      "band": "High"
    },
    {
      "id": "CUST-07551",
      "age": 51,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 4,
      "transactions": 37,
      "utilization": 0.039,
      "segment": "Light Multiproduct Users",
      "risk": 0.7065,
      "band": "High"
    },
    {
      "id": "CUST-03331",
      "age": 49,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 46,
      "utilization": 0.369,
      "segment": "Engaged Revolvers",
      "risk": 0.6936,
      "band": "High"
    },
    {
      "id": "CUST-08022",
      "age": 49,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 1,
      "transactions": 63,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6893,
      "band": "High"
    },
    {
      "id": "CUST-06936",
      "age": 49,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 59,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6738,
      "band": "High"
    },
    {
      "id": "CUST-01615",
      "age": 65,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 61,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6678,
      "band": "High"
    },
    {
      "id": "CUST-01756",
      "age": 52,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 39,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6673,
      "band": "High"
    },
    {
      "id": "CUST-06012",
      "age": 46,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 45,
      "utilization": 0.317,
      "segment": "Engaged Revolvers",
      "risk": 0.6657,
      "band": "High"
    },
    {
      "id": "CUST-00170",
      "age": 53,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 53,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6644,
      "band": "High"
    },
    {
      "id": "CUST-03655",
      "age": 40,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 53,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6597,
      "band": "High"
    },
    {
      "id": "CUST-01055",
      "age": 57,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 54,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6536,
      "band": "High"
    },
    {
      "id": "CUST-00125",
      "age": 55,
      "income": "$120K +",
      "card": "Silver",
      "products": 2,
      "transactions": 42,
      "utilization": 0.044,
      "segment": "Light Multiproduct Users",
      "risk": 0.6497,
      "band": "High"
    },
    {
      "id": "CUST-01198",
      "age": 43,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 31,
      "utilization": 0.828,
      "segment": "Engaged Revolvers",
      "risk": 0.6487,
      "band": "High"
    },
    {
      "id": "CUST-00275",
      "age": 41,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 4,
      "transactions": 32,
      "utilization": 0.196,
      "segment": "Dormant At-Risk",
      "risk": 0.6477,
      "band": "High"
    },
    {
      "id": "CUST-00972",
      "age": 41,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 43,
      "utilization": 0.599,
      "segment": "Engaged Revolvers",
      "risk": 0.6447,
      "band": "High"
    },
    {
      "id": "CUST-06862",
      "age": 50,
      "income": "$120K +",
      "card": "Silver",
      "products": 6,
      "transactions": 55,
      "utilization": 0.0,
      "segment": "Light Multiproduct Users",
      "risk": 0.6271,
      "band": "High"
    },
    {
      "id": "CUST-01505",
      "age": 49,
      "income": "Unknown",
      "card": "Blue",
      "products": 6,
      "transactions": 41,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.6207,
      "band": "High"
    },
    {
      "id": "CUST-05322",
      "age": 40,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 6,
      "transactions": 37,
      "utilization": 0.256,
      "segment": "Engaged Revolvers",
      "risk": 0.6003,
      "band": "High"
    },
    {
      "id": "CUST-01029",
      "age": 53,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 64,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.5933,
      "band": "High"
    },
    {
      "id": "CUST-01373",
      "age": 45,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 57,
      "utilization": 0.779,
      "segment": "Engaged Revolvers",
      "risk": 0.5818,
      "band": "High"
    },
    {
      "id": "CUST-06626",
      "age": 60,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 44,
      "utilization": 0.228,
      "segment": "Dormant At-Risk",
      "risk": 0.5742,
      "band": "High"
    },
    {
      "id": "CUST-02313",
      "age": 55,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 48,
      "utilization": 0.924,
      "segment": "Engaged Revolvers",
      "risk": 0.57,
      "band": "High"
    },
    {
      "id": "CUST-07419",
      "age": 46,
      "income": "Unknown",
      "card": "Blue",
      "products": 3,
      "transactions": 57,
      "utilization": 0.585,
      "segment": "Engaged Revolvers",
      "risk": 0.5663,
      "band": "High"
    },
    {
      "id": "CUST-01470",
      "age": 48,
      "income": "$60K - $80K",
      "card": "Silver",
      "products": 5,
      "transactions": 41,
      "utilization": 0.0,
      "segment": "Light Multiproduct Users",
      "risk": 0.5621,
      "band": "High"
    },
    {
      "id": "CUST-04010",
      "age": 50,
      "income": "Unknown",
      "card": "Blue",
      "products": 6,
      "transactions": 54,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.5558,
      "band": "High"
    },
    {
      "id": "CUST-03185",
      "age": 50,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 57,
      "utilization": 0.603,
      "segment": "Engaged Revolvers",
      "risk": 0.5446,
      "band": "High"
    },
    {
      "id": "CUST-07492",
      "age": 49,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 4,
      "transactions": 54,
      "utilization": 0.042,
      "segment": "Dormant At-Risk",
      "risk": 0.5321,
      "band": "High"
    },
    {
      "id": "CUST-02653",
      "age": 38,
      "income": "$60K - $80K",
      "card": "Silver",
      "products": 3,
      "transactions": 52,
      "utilization": 0.057,
      "segment": "Light Multiproduct Users",
      "risk": 0.5307,
      "band": "High"
    },
    {
      "id": "CUST-00156",
      "age": 42,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 28,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.5237,
      "band": "High"
    },
    {
      "id": "CUST-00410",
      "age": 55,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 44,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.5173,
      "band": "High"
    },
    {
      "id": "CUST-03482",
      "age": 52,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 57,
      "utilization": 0.093,
      "segment": "Dormant At-Risk",
      "risk": 0.5095,
      "band": "High"
    },
    {
      "id": "CUST-01970",
      "age": 37,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 32,
      "utilization": 0.323,
      "segment": "Engaged Revolvers",
      "risk": 0.5031,
      "band": "High"
    },
    {
      "id": "CUST-03498",
      "age": 44,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 33,
      "utilization": 0.144,
      "segment": "Light Multiproduct Users",
      "risk": 0.5025,
      "band": "High"
    },
    {
      "id": "CUST-01270",
      "age": 39,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 40,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.496,
      "band": "Medium"
    },
    {
      "id": "CUST-00093",
      "age": 45,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 4,
      "transactions": 34,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.4604,
      "band": "Medium"
    },
    {
      "id": "CUST-00834",
      "age": 38,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 36,
      "utilization": 0.304,
      "segment": "Engaged Revolvers",
      "risk": 0.4572,
      "band": "Medium"
    },
    {
      "id": "CUST-04649",
      "age": 42,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 30,
      "utilization": 0.258,
      "segment": "Engaged Revolvers",
      "risk": 0.4517,
      "band": "Medium"
    },
    {
      "id": "CUST-02908",
      "age": 46,
      "income": "$40K - $60K",
      "card": "Silver",
      "products": 6,
      "transactions": 56,
      "utilization": 0.057,
      "segment": "Light Multiproduct Users",
      "risk": 0.4414,
      "band": "Medium"
    },
    {
      "id": "CUST-08385",
      "age": 55,
      "income": "Unknown",
      "card": "Blue",
      "products": 1,
      "transactions": 73,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.4344,
      "band": "Medium"
    },
    {
      "id": "CUST-03061",
      "age": 36,
      "income": "$120K +",
      "card": "Blue",
      "products": 3,
      "transactions": 59,
      "utilization": 0.0,
      "segment": "Light Multiproduct Users",
      "risk": 0.4309,
      "band": "Medium"
    },
    {
      "id": "CUST-03865",
      "age": 49,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 6,
      "transactions": 48,
      "utilization": 0.071,
      "segment": "Light Multiproduct Users",
      "risk": 0.4247,
      "band": "Medium"
    },
    {
      "id": "CUST-02024",
      "age": 37,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 36,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.4193,
      "band": "Medium"
    },
    {
      "id": "CUST-01142",
      "age": 62,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 2,
      "transactions": 31,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.4154,
      "band": "Medium"
    },
    {
      "id": "CUST-01268",
      "age": 49,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 62,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.415,
      "band": "Medium"
    },
    {
      "id": "CUST-02972",
      "age": 43,
      "income": "$120K +",
      "card": "Blue",
      "products": 3,
      "transactions": 48,
      "utilization": 0.0,
      "segment": "Light Multiproduct Users",
      "risk": 0.4109,
      "band": "Medium"
    },
    {
      "id": "CUST-00291",
      "age": 44,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 2,
      "transactions": 27,
      "utilization": 0.117,
      "segment": "Light Multiproduct Users",
      "risk": 0.399,
      "band": "Medium"
    },
    {
      "id": "CUST-02231",
      "age": 35,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 3,
      "transactions": 49,
      "utilization": 0.316,
      "segment": "Engaged Revolvers",
      "risk": 0.3939,
      "band": "Medium"
    },
    {
      "id": "CUST-05224",
      "age": 55,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 6,
      "transactions": 57,
      "utilization": 0.793,
      "segment": "Engaged Revolvers",
      "risk": 0.382,
      "band": "Medium"
    },
    {
      "id": "CUST-01285",
      "age": 47,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 40,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.3798,
      "band": "Medium"
    },
    {
      "id": "CUST-08676",
      "age": 44,
      "income": "Less than $40K",
      "card": "Silver",
      "products": 3,
      "transactions": 77,
      "utilization": 0.105,
      "segment": "High-Value Engaged",
      "risk": 0.3786,
      "band": "Medium"
    },
    {
      "id": "CUST-00355",
      "age": 55,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 6,
      "transactions": 38,
      "utilization": 0.953,
      "segment": "Engaged Revolvers",
      "risk": 0.3466,
      "band": "Medium"
    },
    {
      "id": "CUST-02314",
      "age": 52,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 54,
      "utilization": 0.661,
      "segment": "Engaged Revolvers",
      "risk": 0.3422,
      "band": "Medium"
    },
    {
      "id": "CUST-01150",
      "age": 56,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 45,
      "utilization": 0.346,
      "segment": "Engaged Revolvers",
      "risk": 0.3341,
      "band": "Medium"
    },
    {
      "id": "CUST-02391",
      "age": 41,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 52,
      "utilization": 0.648,
      "segment": "Engaged Revolvers",
      "risk": 0.334,
      "band": "Medium"
    },
    {
      "id": "CUST-02346",
      "age": 38,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 4,
      "transactions": 61,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.3315,
      "band": "Medium"
    },
    {
      "id": "CUST-02412",
      "age": 48,
      "income": "$120K +",
      "card": "Blue",
      "products": 5,
      "transactions": 32,
      "utilization": 0.023,
      "segment": "Light Multiproduct Users",
      "risk": 0.3224,
      "band": "Medium"
    },
    {
      "id": "CUST-02961",
      "age": 38,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 6,
      "transactions": 34,
      "utilization": 0.512,
      "segment": "Engaged Revolvers",
      "risk": 0.3023,
      "band": "Medium"
    },
    {
      "id": "CUST-02358",
      "age": 57,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 6,
      "transactions": 37,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.3015,
      "band": "Medium"
    },
    {
      "id": "CUST-08846",
      "age": 42,
      "income": "Unknown",
      "card": "Blue",
      "products": 1,
      "transactions": 80,
      "utilization": 0.112,
      "segment": "High-Value Engaged",
      "risk": 0.2917,
      "band": "Medium"
    },
    {
      "id": "CUST-02552",
      "age": 57,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 4,
      "transactions": 27,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.29,
      "band": "Medium"
    },
    {
      "id": "CUST-01396",
      "age": 37,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 41,
      "utilization": 0.671,
      "segment": "Engaged Revolvers",
      "risk": 0.284,
      "band": "Medium"
    },
    {
      "id": "CUST-01683",
      "age": 56,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 27,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.2791,
      "band": "Medium"
    },
    {
      "id": "CUST-00750",
      "age": 48,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 5,
      "transactions": 35,
      "utilization": 0.078,
      "segment": "Light Multiproduct Users",
      "risk": 0.2791,
      "band": "Medium"
    },
    {
      "id": "CUST-03704",
      "age": 54,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 53,
      "utilization": 0.444,
      "segment": "Engaged Revolvers",
      "risk": 0.2721,
      "band": "Medium"
    },
    {
      "id": "CUST-08608",
      "age": 44,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 80,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.2677,
      "band": "Medium"
    },
    {
      "id": "CUST-01533",
      "age": 48,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 6,
      "transactions": 32,
      "utilization": 0.076,
      "segment": "Light Multiproduct Users",
      "risk": 0.2643,
      "band": "Medium"
    },
    {
      "id": "CUST-00559",
      "age": 40,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 3,
      "transactions": 27,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.2638,
      "band": "Medium"
    },
    {
      "id": "CUST-00970",
      "age": 40,
      "income": "$120K +",
      "card": "Blue",
      "products": 4,
      "transactions": 47,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.2557,
      "band": "Medium"
    },
    {
      "id": "CUST-01035",
      "age": 40,
      "income": "Unknown",
      "card": "Blue",
      "products": 3,
      "transactions": 38,
      "utilization": 0.281,
      "segment": "Dormant At-Risk",
      "risk": 0.2223,
      "band": "Low"
    },
    {
      "id": "CUST-00961",
      "age": 57,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 58,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.1749,
      "band": "Low"
    },
    {
      "id": "CUST-08732",
      "age": 52,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 2,
      "transactions": 81,
      "utilization": 0.074,
      "segment": "High-Value Engaged",
      "risk": 0.1367,
      "band": "Low"
    },
    {
      "id": "CUST-01356",
      "age": 49,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 44,
      "utilization": 0.45,
      "segment": "Engaged Revolvers",
      "risk": 0.1253,
      "band": "Low"
    },
    {
      "id": "CUST-01646",
      "age": 37,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 31,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.1019,
      "band": "Low"
    },
    {
      "id": "CUST-09879",
      "age": 43,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 1,
      "transactions": 90,
      "utilization": 0.0,
      "segment": "High-Value Engaged",
      "risk": 0.1014,
      "band": "Low"
    },
    {
      "id": "CUST-07453",
      "age": 44,
      "income": "Unknown",
      "card": "Blue",
      "products": 4,
      "transactions": 64,
      "utilization": 0.477,
      "segment": "Engaged Revolvers",
      "risk": 0.0807,
      "band": "Low"
    },
    {
      "id": "CUST-03216",
      "age": 44,
      "income": "Unknown",
      "card": "Blue",
      "products": 3,
      "transactions": 50,
      "utilization": 0.075,
      "segment": "Light Multiproduct Users",
      "risk": 0.0547,
      "band": "Low"
    },
    {
      "id": "CUST-09081",
      "age": 44,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 1,
      "transactions": 88,
      "utilization": 0.252,
      "segment": "High-Value Engaged",
      "risk": 0.0532,
      "band": "Low"
    },
    {
      "id": "CUST-05083",
      "age": 48,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 63,
      "utilization": 0.171,
      "segment": "Dormant At-Risk",
      "risk": 0.0433,
      "band": "Low"
    },
    {
      "id": "CUST-03128",
      "age": 34,
      "income": "Unknown",
      "card": "Silver",
      "products": 6,
      "transactions": 64,
      "utilization": 0.022,
      "segment": "Light Multiproduct Users",
      "risk": 0.0389,
      "band": "Low"
    },
    {
      "id": "CUST-02921",
      "age": 52,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 6,
      "transactions": 64,
      "utilization": 0.278,
      "segment": "Dormant At-Risk",
      "risk": 0.0318,
      "band": "Low"
    },
    {
      "id": "CUST-01428",
      "age": 31,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 3,
      "transactions": 64,
      "utilization": 0.365,
      "segment": "Engaged Revolvers",
      "risk": 0.0266,
      "band": "Low"
    },
    {
      "id": "CUST-03845",
      "age": 41,
      "income": "$40K - $60K",
      "card": "Silver",
      "products": 6,
      "transactions": 66,
      "utilization": 0.136,
      "segment": "Light Multiproduct Users",
      "risk": 0.0151,
      "band": "Low"
    },
    {
      "id": "CUST-02762",
      "age": 39,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 6,
      "transactions": 39,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.0103,
      "band": "Low"
    },
    {
      "id": "CUST-00603",
      "age": 31,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 3,
      "transactions": 45,
      "utilization": 0.275,
      "segment": "Dormant At-Risk",
      "risk": 0.0088,
      "band": "Low"
    },
    {
      "id": "CUST-09705",
      "age": 45,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 3,
      "transactions": 88,
      "utilization": 0.057,
      "segment": "High-Value Engaged",
      "risk": 0.0059,
      "band": "Low"
    },
    {
      "id": "CUST-09112",
      "age": 51,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 2,
      "transactions": 100,
      "utilization": 0.096,
      "segment": "High-Value Engaged",
      "risk": 0.0044,
      "band": "Low"
    },
    {
      "id": "CUST-05727",
      "age": 42,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 68,
      "utilization": 0.11,
      "segment": "Light Multiproduct Users",
      "risk": 0.0033,
      "band": "Low"
    },
    {
      "id": "CUST-08222",
      "age": 36,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 2,
      "transactions": 85,
      "utilization": 0.0,
      "segment": "Dormant At-Risk",
      "risk": 0.0027,
      "band": "Low"
    },
    {
      "id": "CUST-06514",
      "age": 55,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 4,
      "transactions": 72,
      "utilization": 0.191,
      "segment": "Dormant At-Risk",
      "risk": 0.0025,
      "band": "Low"
    },
    {
      "id": "CUST-09702",
      "age": 42,
      "income": "$60K - $80K",
      "card": "Silver",
      "products": 3,
      "transactions": 109,
      "utilization": 0.0,
      "segment": "High-Value Engaged",
      "risk": 0.0023,
      "band": "Low"
    },
    {
      "id": "CUST-09747",
      "age": 49,
      "income": "Unknown",
      "card": "Blue",
      "products": 2,
      "transactions": 122,
      "utilization": 0.109,
      "segment": "High-Value Engaged",
      "risk": 0.002,
      "band": "Low"
    },
    {
      "id": "CUST-06917",
      "age": 45,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 6,
      "transactions": 78,
      "utilization": 0.822,
      "segment": "Engaged Revolvers",
      "risk": 0.0018,
      "band": "Low"
    },
    {
      "id": "CUST-07758",
      "age": 53,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 2,
      "transactions": 73,
      "utilization": 0.812,
      "segment": "Engaged Revolvers",
      "risk": 0.0015,
      "band": "Low"
    },
    {
      "id": "CUST-08223",
      "age": 56,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 1,
      "transactions": 86,
      "utilization": 0.493,
      "segment": "Engaged Revolvers",
      "risk": 0.0014,
      "band": "Low"
    },
    {
      "id": "CUST-09692",
      "age": 47,
      "income": "Unknown",
      "card": "Blue",
      "products": 3,
      "transactions": 127,
      "utilization": 0.083,
      "segment": "High-Value Engaged",
      "risk": 0.0013,
      "band": "Low"
    },
    {
      "id": "CUST-09675",
      "age": 57,
      "income": "$80K - $120K",
      "card": "Blue",
      "products": 3,
      "transactions": 114,
      "utilization": 0.066,
      "segment": "High-Value Engaged",
      "risk": 0.0009,
      "band": "Low"
    },
    {
      "id": "CUST-05931",
      "age": 52,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 86,
      "utilization": 0.66,
      "segment": "Engaged Revolvers",
      "risk": 0.0008,
      "band": "Low"
    },
    {
      "id": "CUST-05889",
      "age": 47,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 6,
      "transactions": 82,
      "utilization": 0.889,
      "segment": "Engaged Revolvers",
      "risk": 0.0008,
      "band": "Low"
    },
    {
      "id": "CUST-00021",
      "age": 47,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 5,
      "transactions": 27,
      "utilization": 0.086,
      "segment": "Light Multiproduct Users",
      "risk": 0.0007,
      "band": "Low"
    },
    {
      "id": "CUST-04871",
      "age": 52,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 5,
      "transactions": 83,
      "utilization": 0.42,
      "segment": "Engaged Revolvers",
      "risk": 0.0007,
      "band": "Low"
    },
    {
      "id": "CUST-03239",
      "age": 37,
      "income": "$40K - $60K",
      "card": "Blue",
      "products": 5,
      "transactions": 80,
      "utilization": 0.407,
      "segment": "Engaged Revolvers",
      "risk": 0.0006,
      "band": "Low"
    },
    {
      "id": "CUST-06347",
      "age": 45,
      "income": "Less than $40K",
      "card": "Blue",
      "products": 4,
      "transactions": 88,
      "utilization": 0.625,
      "segment": "Engaged Revolvers",
      "risk": 0.0002,
      "band": "Low"
    },
    {
      "id": "CUST-04182",
      "age": 44,
      "income": "$60K - $80K",
      "card": "Blue",
      "products": 3,
      "transactions": 88,
      "utilization": 0.615,
      "segment": "Engaged Revolvers",
      "risk": 0.0001,
      "band": "Low"
    }
  ],
  "model": {
    "logistic": {
      "model": "Logistic Regression",
      "precision": 0.531,
      "recall": 0.818,
      "f1": 0.644,
      "roc_auc": 0.921,
      "confusion_matrix": [
        [
          1466,
          235
        ],
        [
          59,
          266
        ]
      ]
    },
    "xgboost": {
      "model": "XGBoost",
      "precision": 0.872,
      "recall": 0.92,
      "f1": 0.895,
      "roc_auc": 0.993,
      "confusion_matrix": [
        [
          1657,
          44
        ],
        [
          26,
          299
        ]
      ]
    },
    "top_features": [
      {
        "feature": "Transaction count",
        "importance": 0.227
      },
      {
        "feature": "Revolving balance",
        "importance": 0.132
      },
      {
        "feature": "Products held",
        "importance": 0.083
      },
      {
        "feature": "Gender (M)",
        "importance": 0.07
      },
      {
        "feature": "Total spend",
        "importance": 0.067
      },
      {
        "feature": "Activity change (Q4/Q1)",
        "importance": 0.05
      },
      {
        "feature": "Months inactive",
        "importance": 0.04
      },
      {
        "feature": "Spend change (Q4/Q1)",
        "importance": 0.032
      },
      {
        "feature": "Gender (F)",
        "importance": 0.029
      },
      {
        "feature": "Support contacts",
        "importance": 0.023
      }
    ]
  }
};

const C = {
  bg: "#F2EBE0", panel: "#FDFAF6", panel2: "#EDE5D8", border: "#DDD4C8",
  text: "#3A2E26", muted: "#9C8B7B", gold: "#C4936A", teal: "#7A9E8A",
};
const SEG_COLORS = {
  "High-Value Engaged": "#7A9E8A",
  "Engaged Revolvers": "#7E8FC4",
  "Light Multiproduct Users": "#C4936A",
  "Dormant At-Risk": "#C46B6B",
};
const BAND_COLORS = { Low: "#7A9E8A", Medium: "#C4936A", High: "#D4855A", Critical: "#C46B6B" };

const TABS = ["Overview", "Segments", "Churn Risk", "Retention"];

function fmt(n) { return n.toLocaleString("en-US"); }

function TooltipBox({ active, payload, label, suffix = "" }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: "8px 12px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.text }}>
      {label != null && <div style={{ color: C.muted, marginBottom: 4 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.text }}>
          {p.name}: {p.value}{suffix}
        </div>
      ))}
    </div>
  );
}

function Overview() {
  const k = DATA.kpis;
  const cards = [
    { label: "Customers analyzed", value: fmt(k.total_customers), accent: C.teal },
    { label: "Overall churn rate", value: k.churn_rate_pct + "%", accent: "#E5484D" },
    { label: "Flagged at risk", value: fmt(k.at_risk_count), accent: "#E8893C" },
    { label: "Avg annual spend", value: "$" + fmt(k.avg_spend), accent: C.gold },
  ];
  return (
    <div>
      <div className="kpi-grid">
        {cards.map((c) => (
          <div key={c.label} className="kpi-card">
            <div className="kpi-value" style={{ color: c.accent }}>{c.value}</div>
            <div className="kpi-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Churn rate by products held</h3>
          <span className="panel-note">The strongest lever in the data — not income</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={DATA.churn_by_products} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke={C.border} vertical={false} />
            <XAxis dataKey="label" stroke={C.muted} tick={{ fontSize: 12, fill: C.muted }}
              label={{ value: "Products held", position: "insideBottom", offset: -2, fill: C.muted, fontSize: 11 }} />
            <YAxis stroke={C.muted} tick={{ fontSize: 12, fill: C.muted }} unit="%" />
            <Tooltip content={<TooltipBox suffix="%" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="churn_rate" name="Churn" radius={[4, 4, 0, 0]}>
              {DATA.churn_by_products.map((d, i) => (
                <Cell key={i} fill={d.churn_rate > 20 ? "#E5484D" : d.churn_rate > 14 ? "#E8893C" : C.teal} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Churn rate by income</h3>
            <span className="panel-note">Nearly flat — wealth barely predicts churn</span></div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DATA.churn_by_income} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke={C.border} vertical={false} />
              <XAxis dataKey="label" stroke={C.muted} tick={{ fontSize: 10, fill: C.muted }} interval={0} angle={-18} textAnchor="end" height={50} />
              <YAxis stroke={C.muted} tick={{ fontSize: 12, fill: C.muted }} unit="%" domain={[0, 25]} />
              <Tooltip content={<TooltipBox suffix="%" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="churn_rate" name="Churn" fill={C.gold} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>Predicted risk distribution</h3>
            <span className="panel-note">XGBoost score across all customers</span></div>
          <div style={{ padding: "8px 4px" }}>
            {["Critical", "High", "Medium", "Low"].map((b) => {
              const v = DATA.risk_bands[b] || 0;
              const pct = (v / DATA.kpis.total_customers) * 100;
              return (
                <div key={b} className="riskrow">
                  <span className="riskrow-label">{b}</span>
                  <div className="riskbar-track">
                    <div className="riskbar-fill" style={{ width: pct + "%", background: BAND_COLORS[b] }} />
                  </div>
                  <span className="riskrow-val">{fmt(v)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Segments() {
  const segs = [...DATA.segments].sort((a, b) => a.churn_rate - b.churn_rate);
  return (
    <div>
      <div className="panel">
        <div className="panel-head"><h3>The churn risk spectrum</h3>
          <span className="panel-note">Four behavioral segments, ordered by attrition</span></div>
        <div className="spectrum">
          {segs.map((s) => (
            <div key={s.segment} className="seg-card" style={{ borderTopColor: SEG_COLORS[s.segment] }}>
              <div className="seg-name">{s.segment}</div>
              <div className="seg-churn" style={{ color: SEG_COLORS[s.segment] }}>{s.churn_rate}%</div>
              <div className="seg-churn-label">churn</div>
              <div className="seg-stats">
                <div><span>{fmt(s.size)}</span> customers</div>
                <div><span>${fmt(s.avg_spend)}</span> avg spend</div>
                <div><span>{s.avg_trans}</span> transactions</div>
                <div><span>{(s.avg_util * 100).toFixed(0)}%</span> utilization</div>
                <div><span>{s.avg_products}</span> products</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Behavior map: utilization vs. activity</h3>
          <span className="panel-note">Each dot is a customer — red cluster is the dormant problem</span></div>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid stroke={C.border} />
            <XAxis type="number" dataKey="x" name="Transactions" stroke={C.muted}
              tick={{ fontSize: 12, fill: C.muted }}
              label={{ value: "Annual transactions", position: "insideBottom", offset: -8, fill: C.muted, fontSize: 11 }} />
            <YAxis type="number" dataKey="y" name="Utilization" stroke={C.muted}
              tick={{ fontSize: 12, fill: C.muted }} domain={[0, 1]}
              label={{ value: "Utilization", angle: -90, position: "insideLeft", offset: 16, fill: C.muted, fontSize: 11 }} />
            <ZAxis range={[28, 28]} />
            <Tooltip content={<TooltipBox />} cursor={{ strokeDasharray: "3 3", stroke: C.border }} />
            <Legend wrapperStyle={{ fontSize: 12, color: C.muted }} />
            {Object.keys(SEG_COLORS).map((seg) => (
              <Scatter key={seg} name={seg} data={DATA.scatter.filter((d) => d.seg === seg)}
                fill={SEG_COLORS[seg]} fillOpacity={0.55} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChurnRisk() {
  const m = DATA.model;
  const rows = [
    { k: "Precision", l: m.logistic.precision, x: m.xgboost.precision },
    { k: "Recall", l: m.logistic.recall, x: m.xgboost.recall },
    { k: "F1 score", l: m.logistic.f1, x: m.xgboost.f1 },
    { k: "ROC-AUC", l: m.logistic.roc_auc, x: m.xgboost.roc_auc },
  ];
  const cm = m.xgboost.confusion_matrix; // [[TN,FP],[FN,TP]]
  return (
    <div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Model comparison</h3>
            <span className="panel-note">Evaluated on a held-out test set (imbalanced classes)</span></div>
          <table className="metric-table">
            <thead><tr><th>Metric</th><th>Logistic</th><th>XGBoost</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k}>
                  <td>{r.k}</td>
                  <td className="mono">{r.l}</td>
                  <td className="mono win">{r.x}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="caption">XGBoost wins across the board. Logistic regression keeps decent recall
            but low precision — it over-flags loyal customers.</p>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>XGBoost confusion matrix</h3>
            <span className="panel-note">Test set — catches 92% of churners</span></div>
          <div className="cm-grid">
            <div className="cm-cell tn"><span>{cm[0][0]}</span><label>True stay</label></div>
            <div className="cm-cell fp"><span>{cm[0][1]}</span><label>False alarm</label></div>
            <div className="cm-cell fn"><span>{cm[1][0]}</span><label>Missed churn</label></div>
            <div className="cm-cell tp"><span>{cm[1][1]}</span><label>Caught churn</label></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Top churn drivers</h3>
          <span className="panel-note">Feature importance — disengagement dominates</span></div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={m.top_features} margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
            <CartesianGrid stroke={C.border} horizontal={false} />
            <XAxis type="number" stroke={C.muted} tick={{ fontSize: 11, fill: C.muted }} />
            <YAxis type="category" dataKey="feature" stroke={C.muted} tick={{ fontSize: 11, fill: C.muted }} width={130} />
            <Tooltip content={<TooltipBox />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="importance" name="Importance" fill={C.teal} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CustomerTable />
    </div>
  );
}

function CustomerTable() {
  const [band, setBand] = useState("All");
  const [sortDesc, setSortDesc] = useState(true);
  const rows = useMemo(() => {
    let r = DATA.table.slice();
    if (band !== "All") r = r.filter((x) => x.band === band);
    r.sort((a, b) => (sortDesc ? b.risk - a.risk : a.risk - b.risk));
    return r.slice(0, 40);
  }, [band, sortDesc]);

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Customer risk register</h3>
        <div className="filters">
          {["All", "Critical", "High", "Medium", "Low"].map((b) => (
            <button key={b} className={"chip" + (band === b ? " active" : "")} onClick={() => setBand(b)}>{b}</button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th><th>Age</th><th>Income</th><th>Products</th>
              <th>Txns</th><th>Util</th><th>Segment</th>
              <th className="sortable" onClick={() => setSortDesc(!sortDesc)}>
                Risk {sortDesc ? "▼" : "▲"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                <td>{r.age}</td>
                <td className="muted">{r.income}</td>
                <td>{r.products}</td>
                <td>{r.transactions}</td>
                <td className="mono">{(r.utilization * 100).toFixed(0)}%</td>
                <td><span className="seg-dot" style={{ background: SEG_COLORS[r.segment] }} />{r.segment}</td>
                <td>
                  <span className="band-pill" style={{ background: BAND_COLORS[r.band] + "22", color: BAND_COLORS[r.band], borderColor: BAND_COLORS[r.band] + "55" }}>
                    {(r.risk * 100).toFixed(0)}% · {r.band}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- RETENTION ---------- */
function Retention() {
  const plays = [
    {
      seg: "Dormant At-Risk", priority: "Priority 1", churn: "33%", size: 3060,
      signal: "Holds products but near-zero card usage (5% utilization).",
      action: "Reactivation campaign: targeted bonus rewards on first 5 purchases, plus a 'why aren't you using your card' check-in before month 3 of inactivity.",
    },
    {
      seg: "Light Multiproduct Users", priority: "Priority 2", churn: "13%", size: 1656,
      signal: "Several products, but light, declining spend.",
      action: "Cross-sell the right primary card and nudge auto-pay/recurring bills onto the card to build a usage habit.",
    },
    {
      seg: "Engaged Revolvers", priority: "Maintain", churn: "8%", size: 4236,
      signal: "Healthy utilization and steady spend — profitable core.",
      action: "Protect with proactive credit-limit reviews and fee waivers; watch for support-contact spikes as an early warning.",
    },
    {
      seg: "High-Value Engaged", priority: "Maintain", churn: "4%", size: 1175,
      signal: "Top spenders, very low churn.",
      action: "Don't spend retention budget here. Offer premium-tier upgrades and referral incentives instead.",
    },
  ];
  return (
    <div>
      <div className="panel insight">
        <h3>The one-line strategy</h3>
        <p>Preventable churn is concentrated in a single group. The <b style={{ color: "#E5484D" }}>Dormant
          At-Risk</b> segment is 30% of customers but accounts for the bulk of attrition — they signed up,
          got products, and went quiet. Win them back before inactivity sets in and overall churn drops sharply.</p>
      </div>
      <div className="play-grid">
        {plays.map((p) => (
          <div key={p.seg} className="play-card" style={{ borderLeftColor: SEG_COLORS[p.seg] }}>
            <div className="play-head">
              <span className="play-priority" style={{ color: SEG_COLORS[p.seg] }}>{p.priority}</span>
              <span className="play-meta">{p.churn} churn · {fmt(p.size)} customers</span>
            </div>
            <h4>{p.seg}</h4>
            <p className="play-signal">{p.signal}</p>
            <p className="play-action">{p.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CreditDashboard() {
  const [tab, setTab] = useState("Overview");
  return (
    <div className="cc-root">
      <style>{CSS}</style>
      <header className="cc-header">
        <div>
          <div className="eyebrow">CREDIT CARD PORTFOLIO · 10,127 CUSTOMERS</div>
          <h1 className="cc-title">Customer Analytics &amp; Churn Intelligence</h1>
          <p className="sub">Spending behavior, behavioral segmentation, and predictive attrition risk —
            with retention strategy grounded in the data.</p>
        </div>
        <div className="header-readout">
          <div className="ro"><span>{DATA.kpis.churn_rate_pct}%</span><label>churn</label></div>
          <div className="ro"><span>{DATA.model.xgboost.roc_auc}</span><label>AUC</label></div>
        </div>
      </header>

      <nav className="cc-tabs">
        {TABS.map((t) => (
          <button key={t} className={"cc-tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>{t}</button>
        ))}
      </nav>

      <main className="cc-main">
        {tab === "Overview" && <Overview />}
        {tab === "Segments" && <Segments />}
        {tab === "Churn Risk" && <ChurnRisk />}
        {tab === "Retention" && <Retention />}
      </main>

      <footer className="cc-foot">
        Built with Python · pandas · SQL · scikit-learn · XGBoost · React. Benchmark dataset; production
        churn models typically reach 0.75–0.85 AUC on noisier signals.
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800&family=Nunito+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
.cc-root{background:${C.bg};color:${C.text};font-family:'Nunito Sans',system-ui,sans-serif;min-height:100vh;padding:40px 5%;width:100%;}
.cc-root *{box-sizing:border-box;}
.cc-header{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap;border-bottom:1px solid ${C.border};padding-bottom:22px;}
.eyebrow{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.18em;color:${C.gold};margin-bottom:10px;}
.cc-title{color:${C.gold}}
.cc-header h1{font-family:'Nunito',sans-serif;font-size:30px;line-height:1.1;margin:0 0 8px;font-weight:800;letter-spacing:-0.01em;}
.sub{color:${C.muted};font-size:14px;max-width:560px;margin:0;line-height:1.5;}
.header-readout{display:flex;gap:14px;}
.ro{background:${C.panel};border:1px solid ${C.border};border-radius:14px;padding:12px 18px;text-align:center;min-width:84px;box-shadow:0 2px 8px rgba(58,46,38,.07);}
.ro span{display:block;font-family:'DM Mono',monospace;font-size:24px;font-weight:500;color:${C.gold};}
.ro label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};}
.cc-tabs{display:flex;gap:6px;margin:22px 0 24px;flex-wrap:wrap;}
.cc-tab{background:transparent;border:1px solid ${C.border};color:${C.muted};font-family:'Nunito Sans',sans-serif;font-size:13px;padding:9px 18px;border-radius:20px;cursor:pointer;transition:all .15s;font-weight:600;}
.cc-tab:hover{color:${C.text};border-color:${C.muted};background:${C.panel};}
.cc-tab.active{background:${C.gold};color:#fff;border-color:${C.gold};font-weight:700;}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px;}
.kpi-card{background:${C.panel};border:1px solid ${C.border};border-radius:16px;padding:18px 20px;box-shadow:0 2px 10px rgba(58,46,38,.06);}
.kpi-value{font-family:'Nunito',sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.02em;}
.kpi-label{color:${C.muted};font-size:12px;margin-top:6px;font-weight:600;}
.panel{background:${C.panel};border:1px solid ${C.border};border-radius:16px;padding:20px;margin-bottom:18px;box-shadow:0 2px 10px rgba(58,46,38,.06);}
.panel-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:14px;flex-wrap:wrap;}
.panel-head h3{font-family:'Nunito',sans-serif;font-size:16px;margin:0;font-weight:700;}
.panel-note{color:${C.muted};font-size:12px;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.riskrow{display:flex;align-items:center;gap:12px;margin:11px 0;}
.riskrow-label{width:64px;font-size:12px;color:${C.muted};font-weight:600;}
.riskbar-track{flex:1;height:12px;background:${C.panel2};border-radius:6px;overflow:hidden;}
.riskbar-fill{height:100%;border-radius:6px;transition:width .4s;}
.riskrow-val{width:54px;text-align:right;font-family:'DM Mono',monospace;font-size:13px;}
.spectrum{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.seg-card{background:${C.panel2};border:1px solid ${C.border};border-top:3px solid;border-radius:16px;padding:16px;}
.seg-name{font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;min-height:38px;}
.seg-churn{font-family:'Nunito',sans-serif;font-size:30px;font-weight:800;margin-top:6px;}
.seg-churn-label{color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:12px;font-weight:600;}
.seg-stats{font-size:12px;color:${C.muted};display:flex;flex-direction:column;gap:5px;}
.seg-stats span{color:${C.text};font-family:'DM Mono',monospace;}
.metric-table,.data-table{width:100%;border-collapse:collapse;}
.metric-table th,.metric-table td{text-align:left;padding:9px 10px;border-bottom:1px solid ${C.border};font-size:13px;}
.metric-table th{color:${C.muted};font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.08em;}
.mono{font-family:'DM Mono',monospace;}
.win{color:${C.teal};font-weight:600;}
.caption{color:${C.muted};font-size:12px;line-height:1.5;margin:12px 0 0;}
.cm-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.cm-cell{border-radius:14px;padding:18px;text-align:center;border:1px solid ${C.border};}
.cm-cell span{display:block;font-family:'DM Mono',monospace;font-size:26px;font-weight:500;}
.cm-cell label{font-size:11px;color:${C.muted};text-transform:uppercase;letter-spacing:.08em;font-weight:600;}
.cm-cell.tp{background:rgba(122,158,138,.12);} .cm-cell.tp span{color:#7A9E8A;}
.cm-cell.tn{background:rgba(122,158,138,.10);} .cm-cell.tn span{color:${C.teal};}
.cm-cell.fp{background:rgba(196,147,106,.10);} .cm-cell.fp span{color:${C.gold};}
.cm-cell.fn{background:rgba(196,107,107,.12);} .cm-cell.fn span{color:#C46B6B;}
.filters{display:flex;gap:6px;flex-wrap:wrap;}
.chip{background:transparent;border:1px solid ${C.border};color:${C.muted};font-size:12px;padding:5px 13px;border-radius:20px;cursor:pointer;font-family:'Nunito Sans',sans-serif;font-weight:600;}
.chip.active{background:${C.panel2};color:${C.text};border-color:${C.muted};}
.table-wrap{overflow-x:auto;}
.data-table th,.data-table td{text-align:left;padding:9px 10px;border-bottom:1px solid ${C.border};font-size:12.5px;white-space:nowrap;}
.data-table th{color:${C.muted};font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.06em;}
.data-table td.muted{color:${C.muted};}
.sortable{cursor:pointer;color:${C.gold}!important;}
.seg-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;}
.band-pill{font-family:'DM Mono',monospace;font-size:11px;padding:3px 9px;border-radius:20px;border:1px solid;}
.insight{background:linear-gradient(135deg,${C.panel} 0%,${C.panel2} 100%);}
.insight h3{font-family:'Nunito',sans-serif;font-size:18px;margin:0 0 10px;font-weight:700;}
.insight p{color:${C.text};font-size:14.5px;line-height:1.6;margin:0;max-width:760px;}
.play-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.play-card{background:${C.panel};border:1px solid ${C.border};border-left:4px solid;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(58,46,38,.06);}
.play-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.play-priority{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:500;}
.play-meta{font-size:11px;color:${C.muted};font-family:'DM Mono',monospace;}
.play-card h4{font-family:'Nunito',sans-serif;font-size:16px;margin:0 0 8px;font-weight:700;}
.play-signal{color:${C.muted};font-size:13px;margin:0 0 10px;line-height:1.5;}
.play-action{color:${C.text};font-size:13px;margin:0;line-height:1.55;}
.cc-foot{margin-top:26px;padding-top:18px;border-top:1px solid ${C.border};color:${C.muted};font-size:11.5px;font-family:'DM Mono',monospace;line-height:1.6;}
@media(max-width:820px){.kpi-grid,.spectrum{grid-template-columns:repeat(2,1fr);}.two-col,.play-grid{grid-template-columns:1fr;}.cc-header h1{font-size:24px;}}
`;