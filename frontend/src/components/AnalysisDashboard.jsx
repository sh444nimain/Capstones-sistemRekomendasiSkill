export default function AnalysisDashboard() {
  return (
    <div className="w-full mt-10">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-500">
        
        <div className="mb-8">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white italic">
            Deep Analysis: <span className="text-blue-600">The Painkiller Concept</span>
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Analisis mendalam mengenai kesenjangan skill dan solusi edukasi berbasis SDG.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-3xl transition-all">
            <h4 className="font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2 mb-3">
              The Pain (Problem)
            </h4>
            <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span>•</span> <span>Skill yang dimiliki tidak relevan dengan kebutuhan industri saat ini.</span></li>
              <li className="flex gap-2"><span>•</span> <span>Ketidakpastian dalam menentukan jalur belajar yang paling efektif.</span></li>
            </ul>
          </div>
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl transition-all">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-3">
              The Medicine (Solution)
            </h4>
            <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span>•</span> <span>Kurikulum personal berdasarkan data pasar kerja nyata.</span></li>
              <li className="flex gap-2"><span>•</span> <span>Efisiensi waktu belajar dengan fokus pada Gap Skill utama.</span></li>
            </ul>
          </div>

        </div>
        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
            Official PainKiller Analysis Framework
          </p>
        </div>

      </div>
    </div>
  );
}