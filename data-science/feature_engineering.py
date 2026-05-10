import pandas as pd
import re
import string
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')

# Load Dataset

feature_all_job_df = pd.read_csv(
    '../../data/processed/cleaned_all_job.csv'
)

# Text Preprocessing

feature_all_job_df['combined_features'] = (

    feature_all_job_df['category'].fillna('') + ' ' +

    feature_all_job_df['job_title'].fillna('') + ' ' +

    feature_all_job_df['job_description'].fillna('') + ' ' +

    feature_all_job_df['job_skill_set'].fillna('')
)


stop_words = set(stopwords.words('english'))

stemmer = PorterStemmer()

def preprocess_text(text):

    # pastikan string
    text = str(text)

    # lowercase
    text = text.lower()

    # hapus angka
    text = re.sub(r'\d+', '', text)

    # hapus tanda baca
    text = text.translate(
        str.maketrans('', '', string.punctuation)
    )

    # tokenizing
    tokens = word_tokenize(text)

    # stopword removal + stemming
    tokens = [

        stemmer.stem(word)

        for word in tokens

        if word not in stop_words
    ]

    return ' '.join(tokens)

feature_all_job_df['processed_text'] = (
    feature_all_job_df['combined_features']
    .apply(preprocess_text)
)

# TF-IDF Vectorization

tfidf = TfidfVectorizer(max_features=5000)

tfidf_matrix = tfidf.fit_transform(
    feature_all_job_df['processed_text']
)

print("TF-IDF Matrix Shape:")
print(tfidf_matrix.shape)

# Cosine Similarity

cosine_sim = cosine_similarity(tfidf_matrix)

print("\nCosine Similarity Shape:")
print(cosine_sim.shape)

# Save Feature Engineering Output

joblib.dump(
    tfidf_matrix,
    '../../data/processed/tfidf_matrix.pkl'
)

joblib.dump(
    cosine_sim,
    '../../data/processed/cosine_similarity.pkl'
)

joblib.dump(
    tfidf,
    '../../data/processed/tfidf_vectorizer.pkl'
)