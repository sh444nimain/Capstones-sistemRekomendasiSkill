# 📄 Data Dictionary - Job Recommendation System

## 📊 Deskripsi Dataset

Dataset ini berisi informasi terkait pekerjaan dan keterampilan (skill) yang dibutuhkan. Data digunakan untuk membangun sistem rekomendasi karir dan skill berbasis AI.

---

## 🧩 Struktur Data

| Nama Kolom      | Tipe Data     | Deskripsi                                                                             |
| --------------- | ------------- | ------------------------------------------------------------------------------------- |
| job_id          | int           | ID unik untuk setiap pekerjaan                                                        |
| category        | string        | Kategori pekerjaan (contoh: information technology, finance, hr, dll)                 |
| job_title       | string        | Nama atau judul pekerjaan                                                             |
| job_description | string        | Deskripsi pekerjaan yang menjelaskan tanggung jawab dan kebutuhan posisi              |
| job_skill_set   | string / list | Daftar skill yang dibutuhkan untuk pekerjaan (dipisahkan koma atau dalam bentuk list) |

---

## 🔍 Catatan

- Seluruh teks telah diubah menjadi **lowercase**
- Tidak terdapat **missing value**
- Tidak terdapat **data duplikat**
- Karakter khusus dan simbol yang tidak relevan telah dihapus
- Format kategori telah distandarisasi (menggunakan spasi, bukan tanda "-")
- Deskripsi pekerjaan telah dibersihkan dari newline (`\n`) dan spasi berlebih
