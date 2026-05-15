export default function ResultDashboard({ onReset }) {
  const matchingScore = 68;

  return (
    <div className="max-w-6xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all">
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-center sm:text-left">
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 md:w-32 md:h-32 transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-blue-600 fill-none"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * 68) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black dark:text-white text-slate-900">
                    68<span className="text-sm md:text-lg">%</span>
                  </span>
                </div>
              </div>              
              <div>
                <h2 className="text-xl md:text-2xl font-bold dark:text-white">Analisis Berhasil!</h2>
                <p className="text-sm text-slate-500 mt-1">Profilmu cocok untuk Frontend Developer.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h3 className="font-bold dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-success rounded-full"></span> Skill Terdeteksi
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Tailwind', 'JavaScript'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h3 className="font-bold dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gap rounded-full"></span> Prioritas Belajar
              </h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Next.js'].map(s => (
                  <span key={s} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-bold border border-amber-100 dark:border-amber-800 italic">
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 dark:bg-brand-primary p-8 rounded-3xl text-white shadow-xl transition-colors">
            <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Target Karir</h3>
            <p className="text-xl font-bold italic">"Frontend Developer"</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="font-bold dark:text-slate-200 mb-4">SDG Impact</h3>
            <div className="flex gap-3">
              <div className="flex-1 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/40 rounded-2xl text-center">
                <div className="text-2xl font-black text-yellow-600">4</div>
                <div className="text-[10px] font-bold text-yellow-700 dark:text-yellow-500 uppercase mt-1 leading-tight">Education</div>
              </div>
              <div className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-2xl text-center">
                <div className="text-2xl font-black text-red-600">8</div>
                <div className="text-[10px] font-bold text-red-700 dark:text-red-500 uppercase mt-1 leading-tight">Work</div>
              </div>
            </div>
          </div>

          <button onClick={onReset} className="w-full py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:opacity-80 transition">
            Analisis Ulang
          </button>
        </div>
      </div>
    </div>
  );
}