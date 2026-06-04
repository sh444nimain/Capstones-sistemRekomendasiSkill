import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

export default function SkillInput({ session }) {
  const [skillText, setSkillText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false); // State loading khusus baca PDF

  const fileInputRef = useRef(null);
  const userId = session?.user?.id || null;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil history:", error);
        return;
      }

      setHistory(data);
    };

    fetchHistory();
  }, [userId]);

  // --- FUNGSI PARSING / MEMBACA TEKS PDF DI FRONTEND ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Format file harus PDF, ya!");
      return;
    }

    try {
      setPdfLoading(true);
      // KITA HAPUS pengisian teks "Mohon tunggu" di sini agar tidak mengecoh user

      const pdfjsLib = window["pdfjs-dist/build/pdf"];
      if (!pdfjsLib) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
        document.head.appendChild(script);
        script.onload = () => handleFileUpload(e);
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      if (fullText.trim().length === 0) {
        alert(
          "Waduh, teks di PDF-mu tidak terbaca (kemungkinan berbentuk gambar/scan). Silakan gunakan copy-paste manual atau ganti file PDF yang berbasis teks.",
        );
      } else {
        setSkillText(fullText); // Teks langsung terisi instan setelah selesai dibaca
      }
    } catch (error) {
      console.error("Error membaca PDF:", error);
      alert("Gagal membaca dokumen PDF.");
    } finally {
      setPdfLoading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!skillText.trim() || pdfLoading) {
      alert("Masukkan skill atau unggah PDF kamu dulu, ya!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://capstone-backend-production-cb7c.up.railway.app/predict",
        {
          skills: skillText,
          user_id: userId,
        },
      );
      setResult(response.data);

      const { error } = await supabase.from("history").insert({
        user_id: userId,
        skills: skillText,
        recommendation: response.data.recommendation,
        missing_skills: response.data.missing_skills,
        analysis: response.data.analysis,
      });

      if (error) {
        console.error("Insert history gagal:", error);
      } else {
        // 🔥 RELOAD HISTORY SETELAH INSERT BERHASIL
        const { data } = await supabase
          .from("history")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        setHistory(data);
      }
    } catch (error) {
      console.error("ERROR:", error);
      console.error("RESPONSE:", error.response?.data);
      console.error("STATUS:", error.response?.status);
      alert("Backend gagal connect");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    try {
      await supabase.from("history").delete().eq("user_id", userId);
      setHistory([]);
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus history");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-slate-700 dark:text-slate-300 font-semibold ml-1">
          Input Skill atau Unggah CV (PDF)
        </label>

        {/* INDIKATOR LOADING BARU: Muncul di atas textarea, memberi sinyal AI sedang membaca berkas */}
        {pdfLoading && (
          <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold px-3 py-1 rounded-full animate-pulse border border-amber-200/30">
            ⚡ Memindai Dokumen...
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          className={`w-full h-48 p-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder:text-slate-400 ${
            pdfLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          placeholder="Ketik langsung kemampuanmu di sini, atau klik tombol 'Upload PDF' di bawah untuk membaca otomatis teks dari CV kamu!"
          value={skillText}
          onChange={(e) => setSkillText(e.target.value)}
          disabled={pdfLoading}
        ></textarea>

        {/* OVERLAY SKELETON: Menutupi textarea saat loading agar user tahu sistem tidak eror */}
        {pdfLoading && (
          <div className="absolute inset-0 bg-slate-100/10 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Mengekstrak isi CV...
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 no-print">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf"
          className="hidden"
        />

        {/* TOMBOL UPLOAD PDF */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={pdfLoading || loading}
          className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 px-6 rounded-2xl transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 disabled:opacity-50"
        >
          {pdfLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin"></div>
              Membaca...
            </>
          ) : (
            <>📎 Upload PDF CV</>
          )}
        </button>

        {/* TOMBOL ANALISIS */}
        <button
          onClick={handleAnalyze}
          disabled={pdfLoading || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all transform scale-100 hover:scale-105 shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50"
        >
          {loading ? "Menganalisis..." : "Analisis dengan AI"}
        </button>
      </div>

      {/* HASIL ANALISIS */}
      {result && (
        <div
          id="printable-result"
          className="mt-8 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/20 dark:border-slate-700/20"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              ✨ Hasil Analisis AI
            </h2>
            <button
              onClick={() => window.print()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5 no-print"
            >
              🖨️ Cetak / Simpan PDF
            </button>
          </div>

          <p className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {result.analysis}
          </p>

          <div className="mb-6">
            <h3 className="font-bold mb-3 text-lg text-slate-800 dark:text-slate-200">
              Rekomendasi Karir
            </h3>

            {result.recommendation.map((item, index) => {
              const matchPercent = parseInt(item.match) || 0;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl mb-3 flex justify-between items-center border border-slate-200/40 dark:border-slate-800/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-slate-100 dark:text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-blue-600 dark:text-blue-500"
                          strokeDasharray={`${matchPercent}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-black text-blue-600 dark:text-blue-400">
                        {item.match}
                      </span>
                    </div>

                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.role}
                    </span>
                  </div>

                  <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100/30 dark:border-blue-900/20">
                    Match
                  </span>
                </div>
              );
            })}
          </div>

          <div>
            <h3 className="font-bold mb-3 text-lg text-slate-800 dark:text-slate-200">
              Skill yang Perlu Dipelajari
            </h3>

            <div className="flex flex-wrap gap-2">
              {result.missing_skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100/40 dark:border-red-900/30 px-3 py-1.5 rounded-xl text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RIWAYAT ANALISIS */}
      {userId && history.length > 0 && (
        <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 no-print">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              📜 Riwayat Analisis
            </h2>
            <button
              onClick={handleDeleteHistory}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              🗑 Hapus
            </button>
          </div>

          <div className="space-y-3">
            {(history || []).map((item) => {
              const tanggalMentah = item.created_at || item.createdAt;
              const tanggalDiformat = tanggalMentah
                ? new Date(tanggalMentah).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Waktu tidak tercatat";

              return (
                <div
                  key={item.id}
                  className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200/40 dark:border-slate-700/40"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500 uppercase">
                      📅 {tanggalDiformat}
                    </span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm">
                    {item.skills}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
