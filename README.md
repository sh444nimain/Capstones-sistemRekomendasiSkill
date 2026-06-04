# SkillMatch.AI

## Sistem Rekomendasi Skill dan Karir Berbasis AI

SkillMatch.AI adalah platform berbasis Artificial Intelligence (AI) yang membantu pengguna menemukan karier yang sesuai dengan keterampilan yang dimiliki serta memberikan rekomendasi skill yang perlu dikembangkan untuk meningkatkan peluang kerja. Sistem memanfaatkan teknologi Natural Language Processing (NLP) dan Machine Learning untuk menganalisis data pekerjaan dan keterampilan secara otomatis.

## Capstone Project

**Coding Camp 2026 powered by DBS Foundation**

**ID Tim:** CC26-PSU331

**Tema:** Future-Ready Work & Economy

---

## Anggota Tim

| ID Peserta     | Nama                                 | Learning Path            |
| -------------- | ------------------------------------ | ------------------------ |
| CFCC362D6X1424 | Aisya                                | Full-Stack Web Developer |
| CFCC012D6X0121 | Margaretha Gratia Yollanda Stephanie | Full-Stack Web Developer |
| CDCC329D6Y0622 | Giga Syakir Ihsan Syahbani           | Data Scientist           |
| CDCC329D6Y0598 | Zurich Sabil                         | Data Scientist           |
| CACC006D6Y0943 | Fikri Riaditya Ramadhani             | AI Engineer              |
| CACC764D6Y0897 | Aa Setya Wibawa                      | AI Engineer              |

---

## Latar Belakang

Perkembangan teknologi dan kebutuhan industri yang terus berubah menyebabkan banyak individu mengalami kesulitan dalam menentukan arah karier serta memahami keterampilan yang dibutuhkan oleh dunia kerja. SkillMatch.AI dikembangkan untuk membantu pengguna mengidentifikasi pekerjaan yang sesuai dengan kemampuan yang dimiliki serta memberikan rekomendasi skill yang relevan berdasarkan kebutuhan industri.

---

## Fitur Utama

- Rekomendasi pekerjaan berdasarkan keterampilan pengguna.
- Identifikasi skill gap.
- Rekomendasi skill yang perlu dipelajari.
- Klasifikasi kategori pekerjaan menggunakan model NLP.
- Dashboard visualisasi data pekerjaan dan keterampilan.
- Antarmuka web yang interaktif dan mudah digunakan.

---

## Teknologi yang Digunakan

### Data Science

- Python
- Pandas
- NumPy
- Scikit-Learn

### Artificial Intelligence

- TensorFlow
- Keras
- NLP
- BiLSTM
- TextVectorization

### Backend

- Node.js
- Express.js
- FastAPI / Flask

### Frontend

- React.js
- Tailwind CSS
- Vite

### Deployment

- Vercel
- Render

---

## Tautan Deployment Produk

- SkillMatch.AI: https://skillmatchai-six.vercel.app/
- Dashboard: https://dashboard-skillmatchai.streamlit.app/

---

## Tautan Repository GitHub

- Repository Utama: https://github.com/sh444nimain/Capstones-sistemRekomendasiSkill
- Repository Frontend: https://github.com/sh444nimain/Capstone-frontend
- Repository Backend: https://github.com/sh444nimain/Capstone-backend
- Repository Dashboard: https://github.com/sanhappyending/dashboardCapstone

---

## Struktur Repository

```text
Capstones-sistemRekomendasiSkill/
├── ai/
├── backend/
├── dashboard/
├── data-science/
├── data/
├── docs/
├── frontend/
├── README.md
└── package-lock.json
```

## Arsitektur Sistem

```text
User Input
      │
      ▼
Frontend (React)
      │
      ▼
Backend API
      │
      ├────────► AI Model (BiLSTM)
      │
      ▼
Recommendation Engine
      │
      ▼
Job & Skill Recommendation
```

## Dataset

Dataset yang digunakan berasal dari Kaggle Job Skill Set Dataset yang berisi informasi mengenai:

- Job Title
- Job Description
- Job Skill Set
- Category

Dataset digunakan untuk proses analisis, klasifikasi, dan rekomendasi karier.

---

## Model AI

Model yang digunakan adalah NLP Text Classification berbasis Deep Learning dengan arsitektur:

```text
Text Input
    ↓
TextVectorization
    ↓
Embedding Layer
    ↓
Bidirectional LSTM
    ↓
Dropout
    ↓
Dense Layer
    ↓
Softmax Output
```

Output model berupa kategori pekerjaan yang kemudian digunakan dalam proses rekomendasi.

---

## Instalasi

### Clone Repository

```bash
git clone https://github.com/username/Capstones-sistemRekomendasiSkill.git
cd Capstones-sistemRekomendasiSkill
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Dashboard

```bash
cd dashboard
pip install -r requirements.txt
streamlit run app.py
```

### AI Model

```bash
cd ai
jupyter notebook
```

---

## Dokumentasi

- Laporan Teknis Komprehensif
- Data Dictionary
