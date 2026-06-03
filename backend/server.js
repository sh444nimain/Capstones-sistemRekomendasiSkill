require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// Konfigurasi Database Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('✅ Berhasil terhubung ke Database Supabase!'))
  .catch((err) => console.error('❌ Gagal terhubung ke Database:', err));


app.get('/', (req, res) => {
  res.send('Backend SkillMatch AI berjalan 🚀');
});

// 1. MENGAMBIL RIWAYAT LANGSUNG DARI SUPABASE
// ... (bagian atas server.js seperti konfigurasi express dan pool tetap sama) ...

// 1. MENGAMBIL RIWAYAT (Hanya milik user yang sedang login)
app.get('/history', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.json([]);
  try {
    // Mengambil semua kolom termasuk created_at dan diurutkan dari yang terbaru
    const result = await pool.query(
      'SELECT * FROM ai_history WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    res.json(result.rows); // <--- Data created_at otomatis ikut terkirim ke frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data history' });
  }
});

// 2. MENGHAPUS RIWAYAT (Hanya milik user yang meminta)
app.delete('/history', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID wajib disertakan' });
  }

  try {
    // Menghapus data spesifik milik user tersebut saja, bukan mengosongkan seluruh tabel
    await pool.query('DELETE FROM ai_history WHERE user_id = $1', [user_id]);
    res.json({ message: 'History kamu berhasil dihapus permanen' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menghapus history' });
  }
});

// 3. LOGIKA ANALISIS AI DAN MENYIMPANNYA (Disertai user_id)
// 3. LOGIKA ANALISIS AI (Sekarang Menggunakan Gemini agar Dinamis)
// 3. LOGIKA ANALISIS AI (Menghubungkan ke Python Flask di Port 5001)
// Jalur Analisis: Mengirim data ke Python Flask
app.post('/analyze', async (req, res) => {
  const { skills, user_id } = req.body;

  if (!skills) {
    return res.status(400).json({ error: 'Skill tidak boleh kosong' });
  }

  try {
    console.log(`📡 Mengirim skill ke Python AI: "${skills}"`);

    // --- MENEMBAK KE PYTHON FLASK (PORT 5001) ---
    const pythonResponse = await axios.post('http://127.0.0.1:5001/predict', {
      skills: skills
    });

    // Mengambil hasil prediksi dari Python
    const { analysis, recommendation, missing_skills } = pythonResponse.data;

    // Jika user_id ada (User Login), simpan ke database Supabase
    if (user_id) {
      console.log("💾 Menyimpan hasil rekomendasi ke Supabase...");
      const queryText = `
        INSERT INTO ai_history (user_id, skills, recommendation, missing_skills, analysis)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      const values = [
        user_id,
        skills,
        JSON.stringify(recommendation),
        JSON.stringify(missing_skills),
        analysis
      ];
      const dbResult = await pool.query(queryText, values);
      return res.json(dbResult.rows[0]);
    }

    // Jika Mode Tamu (Tanpa Login), langsung kirim ke frontend
    res.json({
      skills,
      recommendation,
      missing_skills,
      analysis,
      createdAt: new Date().toISOString()
    });

  } catch (err) {
    console.error("❌ Gagal terhubung ke Python Flask:", err.message);
    res.status(500).json({ 
      error: "Can't Connect to AI Server. Pastikan Python Flask (Port 5001) sudah dinyalakan." 
    });
  }
});

// ... (Bagian app.listen tetap sama) ...

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});