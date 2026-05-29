import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AnalysisDashboard from "./components/AnalysisDashboard";
import ResultDashboard from "./components/ResultDashboard";
import SkillInput from "./components/SkillInput";

function App() {
  const [currentView, setCurrentView] = useState("input");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStartAnalysis = () => {
    setCurrentView("loading");
    setTimeout(() => {
      setCurrentView("result");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans text-slate-900 dark:text-slate-100 pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("input")}>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-xl font-black tracking-tight dark:text-white">
              SkillMatch<span className="text-blue-600">.AI</span>
            </span>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? "Mode Terang" : "Mode Gelap"}
            </button>
          </div>

        </div>
      </nav>

      <main className="px-4 pt-16">
        {currentView === "input" && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <header className="max-w-4xl mx-auto text-center mb-12">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-200 dark:border-blue-800">
                Sustainable Development Goals 4 & 8
              </span>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Cari Tahu <span className="text-blue-600 italic">Skill Gap</span> Kamu
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Bandingkan keahlianmu dengan kebutuhan industri nyata melalui analisis NLP yang akurat untuk mendukung pekerjaan layak bagi mahasiswa.
              </p>
            </header>
            <SkillInput onAnalyze={handleStartAnalysis} />
          </div>
        )}

        {currentView === "loading" && (
          <div className="max-w-md mx-auto mt-32 text-center">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold italic">Menganalisis Dataset...</h3>
          </div>
        )}
        {currentView === "result" && (
          <div className="max-w-6xl mx-auto px-4 space-y-8 animate-in fade-in duration-700">
            <ResultDashboard onReset={() => setCurrentView("input")} />
            <AnalysisDashboard />

            <div className="flex justify-center pb-12">
              <button
                onClick={() => setCurrentView("input")}
                className="px-10 py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:scale-105 transition-all shadow-md"
              >
                Analisis Skill Lainnya
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-32 pb-10 text-center border-t border-slate-100 dark:border-slate-900 pt-10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">
          Official Prototype Project
        </p>
        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-yellow-100 dark:shadow-none">4</div>
            <span className="text-[8px] font-bold text-slate-400">EDUCATION</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-red-100 dark:shadow-none">8</div>
            <span className="text-[8px] font-bold text-slate-400">WORK</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;