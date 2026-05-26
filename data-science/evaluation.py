import pandas as pd
import re
import string
import joblib
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import nltk
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

print("=" * 50)
print("MEMULAI PROSES A/B TESTING")
print("=" * 50)

# Load Dataset

df = pd.read_csv(
    '../../data/processed/cleaned_all_job.csv'
)

print("\nDataset berhasil dimuat")
print(f"Jumlah data: {len(df)}")

# ======================================================
# MODEL A (BASELINE)
# ======================================================

print("\n" + "=" * 50)
print("MEMBUAT MODEL A (BASELINE)")
print("=" * 50)

df['baseline_features'] = (
    df['category'].fillna('') + ' ' +
    df['job_title'].fillna('') + ' ' +
    df['job_description'].fillna('') + ' ' +
    df['job_skill_set'].fillna('')
)

def simple_preprocess(text):

    text = str(text)

    # lowercase
    text = text.lower()

    # remove numbers
    text = re.sub(r'\d+', '', text)

    # remove punctuation
    text = text.translate(
        str.maketrans('', '', string.punctuation)
    )

    return text

df['baseline_text'] = (
    df['baseline_features']
    .apply(simple_preprocess)
)

# TF-IDF Model A

tfidf_A = TfidfVectorizer(max_features=5000)

tfidf_matrix_A = tfidf_A.fit_transform(
    df['baseline_text']
)

print("\nTF-IDF Matrix Model A:")
print(tfidf_matrix_A.shape)

# Cosine Similarity Model A

cosine_sim_A = cosine_similarity(
    tfidf_matrix_A
)

print("\nCosine Similarity Model A:")
print(cosine_sim_A.shape)

# ======================================================
# MODEL B (IMPROVED MODEL)
# ======================================================

print("\n" + "=" * 50)
print("LOAD MODEL B (FEATURE ENGINEERING)")
print("=" * 50)

tfidf_matrix_B = joblib.load(
    '../../data/processed/tfidf_matrix.pkl'
)

cosine_sim_B = joblib.load(
    '../../data/processed/cosine_similarity.pkl'
)

tfidf_vectorizer_B = joblib.load(
    '../../data/processed/tfidf_vectorizer.pkl'
)

print("\nModel B berhasil dimuat")

# ======================================================
# RECOMMENDATION FUNCTION
# ======================================================

def get_recommendations(
    title,
    cosine_sim,
    df,
    top_n=5
):

    idx = df[
        df['job_title'] == title
    ].index[0]

    sim_scores = list(
        enumerate(cosine_sim[idx])
    )

    sim_scores = sorted(
        sim_scores,
        key=lambda x: x[1],
        reverse=True
    )

    sim_scores = sim_scores[1:top_n+1]

    job_indices = [
        i[0] for i in sim_scores
    ]

    return df[
        ['job_title']
    ].iloc[job_indices]

# ======================================================
# TESTING RECOMMENDATION
# ======================================================

print("\n" + "=" * 50)
print("TESTING RECOMMENDATION")
print("=" * 50)

sample_job = df['job_title'].iloc[0]

print("\nSample Job:")
print(sample_job)

# Recommendation Model A

print("\n=== Recommendation Model A ===")

recommendation_A = get_recommendations(
    sample_job,
    cosine_sim_A,
    df
)

print(recommendation_A)

# Recommendation Model B

print("\n=== Recommendation Model B ===")

recommendation_B = get_recommendations(
    sample_job,
    cosine_sim_B,
    df
)

print(recommendation_B)

# ======================================================
# EVALUATION
# ======================================================

print("\n" + "=" * 50)
print("EVALUATION")
print("=" * 50)

avg_similarity_A = cosine_sim_A.mean()

avg_similarity_B = cosine_sim_B.mean()

print("\nAverage Similarity Model A:")
print(avg_similarity_A)

print("\nAverage Similarity Model B:")
print(avg_similarity_B)
