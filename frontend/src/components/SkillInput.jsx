import { useState } from "react";

export default function SkillInput({ onAnalyze }) {
  const [skillText, setSkillText] = useState("");

  const handleAnalyze = () => {
    if (!skillText.trim()) {
      alert("Masukkan skill kamu dulu, ya!");
      return;
    }
    onAnalyze(); 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-3 ml-1">
        Input Skill atau Pengalaman
      </label>
      <textarea
        className="w-full h-48 p-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none placeholder:text-slate-400"
        placeholder="Contoh: Saya menguasai React, Tailwind, dan sedikit Node.js..."
        value={skillText}
        onChange={(e) => setSkillText(e.target.value)}
      ></textarea>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleAnalyze}
          className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-blue-200 dark:shadow-none"
        >
          Analisis dengan AI
        </button>
      </div>
    </div>
  );
}