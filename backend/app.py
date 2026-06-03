from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import re
import string
import numpy as np
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import nltk

# Download semua resource NLTK yang dibutuhkan oleh tim Data Science
nltk.download('punkt')
nltk.download('punkt_tab')  # <-- WAJIB ADA UNTUK TOKENIZER BARU
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

# LOAD MODEL DAN DATASET
try:
    df = pd.read_csv('../data/processed/cleaned_all_job.csv')
    tfidf_vectorizer = joblib.load('../data/processed/tfidf_vectorizer.pkl')
    tfidf_matrix = joblib.load('../data/processed/tfidf_matrix.pkl')
    print("✅ Model TF-IDF dan Dataset Berhasil Dimuat!")
except Exception as e:
    print(f"❌ Gagal memuat file model/data: {str(e)}")

# PREPROCESSING LOGIC
stop_words = set(stopwords.words('english'))
stemmer = PorterStemmer()

def preprocess_text(text):
    text = str(text).lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    tokens = [stemmer.stem(word) for word in tokens if word not in stop_words]
    return ' '.join(tokens)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_skills = data.get('skills', '')
        
        if not user_skills:
            return jsonify({"error": "Skill tidak boleh kosong"}), 400

        # 1. Jalankan Preprocessing teks
        clean_input = preprocess_text(user_skills)
        
        # 2. Transform ke Vektor TF-IDF
        user_vector = tfidf_vectorizer.transform([clean_input])
        
        # 3. Hitung Cosine Similarity secara manual memakai matriks bawaan
        # (Sama dengan metode perkalian dot jika vektor sudah dinormalisasi)
        similarity_scores = (user_vector * tfidf_matrix.T).toarray().flatten()
        
        # 4. Ambil indeks kecocokan tertinggi
        best_match_idx = np.argmax(similarity_scores)
        highest_score = similarity_scores[best_match_idx]
        
        # Jika tidak ada lowongan yang mirip sama sekali (Skor = 0)
        if highest_score == 0:
            return jsonify({
                "analysis": "Skill yang kamu masukkan belum spesifik atau tidak ditemukan di dataset.",
                "recommendation": [{"role": "General Staff", "match": "0%"}],
                "missing_skills": ["Pelajari skill teknis seperti Python, Javascript, atau SQL"]
            })

        # 5. Ambil data baris pekerjaan terbaik
        recommended_job = df.iloc[best_match_idx]
        job_title = recommended_job['job_title']
        job_category = recommended_job.get('category', 'Spesialis')
        job_description = recommended_job.get('job_description', '')

        # Analisis skill yang kurang secara sederhana
        required_skills = str(recommended_job.get('job_skill_set', '')).lower()
        missing = [skill.strip() for skill in required_skills.split(',') if skill.strip() and skill.strip() not in clean_input][:3]
        if not missing:
            missing = ["Tingkatkan portofolio proyek nyata"]

        return jsonify({
            "analysis": f"Berdasarkan skill kamu, lowongan paling cocok adalah {job_title} di bidang {job_category}.",
            "recommendation": [{"role": job_title, "match": f"{round(highest_score * 100)}%"}],
            "missing_skills": missing
        })

    except Exception as e:
        # Menampilkan detail error asli di terminal Python agar mudah dilacak
        import traceback
        print("❌ ERROR TERJADI DI PYTHON:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)