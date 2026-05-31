from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# --- KONFIGURASI SESUAI NOTEBOOK ---
MAX_TOKENS = 10000
MAX_LENGTH = 200

# 1. Inisialisasi Vectorizer (Harus sama dengan di Notebook)
vectorizer = tf.keras.layers.TextVectorization(
    max_tokens=MAX_TOKENS,
    output_mode='int',
    output_sequence_length=MAX_LENGTH
)

# Ambil lokasi folder
base_path = os.path.dirname(os.path.abspath(__file__))
# Path model (Opsi B: Keluar satu folder lalu masuk ke ai)
model_path = os.path.join(base_path, '..', 'ai', 'job_classifier_model.keras')

model = None

try:
    if os.path.exists(model_path):
        model = tf.keras.models.load_model(model_path)
        print("✅ Model Berhasil Dimuat!")
        
        # PENTING: Jika model tidak menyertakan vectorizer di dalamnya, 
        # kita butuh meng-adapt vectorizer ini. 
        # Untuk sementara kita buat dummy adapt agar layer tidak error saat dipanggil.
        # Jika kamu punya file vocab, itu lebih baik.
        vectorizer.adapt(["dummy data"]) 
    else:
        print(f"❌ File tidak ditemukan di: {model_path}")
except Exception as e:
    print(f"❌ Error saat memuat model: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict():
    print("\n--- ADA PERMINTAAN MASUK ---")
    try:
        data = request.json
        # Ambil teks, kecilkan huruf, dan hapus spasi di ujung
        user_skills = str(data.get('skills', '')).lower().strip()
        
        if not user_skills:
            print("⚠️ Input kosong!")
            return jsonify({"error": "Skill tidak boleh kosong"}), 400

        print(f"🔍 Memproses skill: '{user_skills}'")

        # --- PROTEKSI TIPE DATA ---
        # Kita pastikan data benar-benar berupa tensor string yang bersih
        input_tensor = tf.constant([user_skills], dtype=tf.string)
        
        # Prediksi
        prediction = model.predict(input_tensor)
        
        # Ambil skor tertinggi
        predicted_role_index = int(np.argmax(prediction))
        score = float(np.max(prediction))
        
        print(f"✅ Berhasil! Index: {predicted_role_index}, Confidence: {score:.2f}")

        # Urutan Role (WAJIB: Samakan urutan ini dengan LabelEncoder di Notebook kamu!)
        roles = ["Frontend Developer", "Backend Developer", "Data Scientist", "UI/UX Designer"]
        
        if predicted_role_index < len(roles):
            role_name = roles[predicted_role_index]
        else:
            role_name = "Digital Specialist"

        return jsonify({
            "analysis": f"Berdasarkan analisis AI pada skill '{user_skills}', kamu memiliki potensi besar di bidang {role_name}.",
            "recommendation": [{"role": role_name, "match": f"{round(score * 100)}%"}],
            "missing_skills": ["Pelajari lebih dalam framework populer di bidang ini."]
        })

    except Exception as e:
        # Tampilkan error lengkap di terminal biar kita tahu kenapa dia ngambek
        print(f"❌ ERROR TERJADI: {str(e)}")
        return jsonify({"error": "Gagal memproses skill tersebut"}), 500

if __name__ == '__main__':
    # Gunakan port 5001 agar tidak bentrok dengan Node.js (5000)
    app.run(port=5001, debug=True)