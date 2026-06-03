import { useState } from "react";

export default function LandingPage({ onLoginClick, onRegisterClick }) {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors font-sans antialiased selection:bg-blue-500 selection:text-white">

            {/* 1. NAVBAR SECTION */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-900 transition-colors">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        SkillMatch<span className="text-blue-600">.AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onLoginClick}
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-4 py-2.5 transition-colors"
                        >
                            Masuk
                        </button>
                        <button
                            onClick={onRegisterClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10 hover:scale-[1.02]"
                        >
                            Daftar Akun
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. HERO SECTION */}
            <section className="relative overflow-hidden pt-20 pb-16 px-6 text-center">
                {/* Efek Glow Futuristik */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 mb-6 uppercase tracking-wider">
                        🤖 Powered by TF-IDF & Cosine Similarity
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                        Ukur Kecocokan Skill Kamu <br />
                        Dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Kebutuhan Industri</span>
                    </h1>

                    <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Jangan biarkan CV kamu berakhir di tempat sampah digital. Analisis keahlian teknismu menggunakan AI canggih dan temukan posisi karir yang paling relevan dalam hitungan detik.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={onRegisterClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
                        >
                            Mulai Analisis Gratis
                        </button>
                        <a
                            href="#fitur"
                            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-semibold py-4 px-8 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                        >
                            Pelajari Cara Kerja
                        </a>
                    </div>
                </div>
            </section>

            {/* 3. STATS SECTION */}
            <section className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 p-8 rounded-3xl text-center shadow-sm">
                    <div>
                        <div className="text-3xl font-black text-blue-600">1,000+</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Data Lowongan</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-blue-600">500+</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Daftar Keahlian</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-blue-600">99.8%</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Akurasi TF-IDF</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-blue-600">&lt; 3 Detik</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Kecepatan Analisis</div>
                    </div>
                </div>
            </section>

            {/* 4. FEATURES SECTION */}
            <section id="fitur" className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Mengapa Harus SkillMatch.AI?</h2>
                    <p className="mt-4 text-slate-500">Dibuat khusus untuk membantu menjembatani celah antara dunia pendidikan akademis dengan kebutuhan nyata bursa kerja.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">🎯</div>
                        <h3 className="text-xl font-bold mb-3">Rekomendasi Presisi</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Algoritma NLP kami memproses kecocokan secara tekstual dan kontekstual menggunakan data set industri yang telah dibersihkan secara mendalam.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">📊</div>
                        <h3 className="text-xl font-bold mb-3">Pemetaan Skill Gap</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Bukan cuma menebak profesi, sistem kami juga mendeteksi 3 skill terpenting apa saja yang belum kamu miliki untuk posisi tersebut.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-900 shadow-sm hover:border-blue-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">📜</div>
                        <h3 className="text-xl font-bold mb-3">Riwayat Terenkripsi</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Semua pencarian dan riwayat hasil analisismu tersimpan rapi dan aman di cloud, siap diakses kapan pun kamu membutuhkannya kembali.
                        </p>
                    </div>
                </div>
            </section>
            {/* NEW: SDGs CONTRIBUTION SECTION */}
            <section className="bg-blue-600 text-white py-16 px-6 rounded-3xl max-w-6xl mx-auto mb-20 relative overflow-hidden shadow-xl shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-50" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="bg-white/20 text-white border border-white/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Kontribusi Pembangunan Berkelanjutan (SDGs)
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6">
                        Mendukung Pendidikan Berkualitas & Pekerjaan Layak
                    </h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
                        SkillMatch.AI berkomitmen nyata dalam mendukung agenda global PBB khususnya **SDG 4 (Pendidikan Bermutu)** dan **SDG 8 (Pekerjaan Layak & Pertumbuhan Ekonomi)** dengan meminimalisir kesenjangan keterampilan mahasiswa demi masa depan industri Indonesia.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                            <div className="text-2xl mb-2">📚</div>
                            <h4 className="font-bold text-lg mb-1">SDG 4: Pendidikan Bermutu</h4>
                            <p className="text-blue-100 text-xs leading-relaxed">Membantu mahasiswa mengidentifikasi keterampilan teknis yang kurang secara mandiri (self-directed learning) agar sesuai standar industri.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                            <div className="text-2xl mb-2">💼</div>
                            <h4 className="font-bold text-lg mb-1">SDG 8: Pekerjaan Layak</h4>
                            <p className="text-blue-100 text-xs leading-relaxed">Menyelaraskan potensi kelulusan dengan bursa kerja riil untuk mengurangi angka pengangguran terdidik dan salah jurusan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className="border-t border-slate-200 dark:border-slate-900 py-8 px-6 text-center text-sm text-slate-400">
                <p>&copy; 2026 SkillMatch.AI. Proyek Capstone Jaringan Rekomendasi Karir. All rights reserved.</p>
            </footer>
        </div>
    );
}