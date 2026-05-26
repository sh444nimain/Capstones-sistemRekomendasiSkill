import { useState } from "react";
import axios from "axios";

export default function SkillInput({}) {

const [skillText, setSkillText] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [history, setHistory] = useState([]);

const handleAnalyze = async () => {

if (!skillText.trim()) {
alert("Masukkan skill kamu dulu, ya!");
return;
}

try {

setLoading(true);

const response = await axios.post(
"http://localhost:3000/analyze",
{
skills: skillText,
}
);

console.log(response.data);

setResult(response.data);

const historyResponse = await axios.get(
"http://localhost:3000/history"
);

console.log(historyResponse.data);

setHistory(historyResponse.data);

} catch (error) {

console.error(error);
alert("Backend gagal connect");

}

finally {

setLoading(false);

}

};

const handleDeleteHistory = async () => {

try {

await axios.delete(
"http://localhost:3000/history"
);

setHistory([]);

} catch (error) {

console.error(error);
alert("Gagal menghapus history");

}

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

{loading && (

<div className="mt-6 text-center text-blue-500 font-semibold">
Menganalisis skill kamu...
</div>

)}

{result && (

<div className="mt-8 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">

<h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
✨ Hasil Analisis AI
</h2>

<p className="mb-6 text-slate-700 dark:text-slate-300">
{result.analysis}
</p>

<div className="mb-6">

<h3 className="font-semibold mb-3 text-lg">
Rekomendasi Karir
</h3>

{result.recommendation.map((item, index) => (

<div
key={index}
className="bg-white dark:bg-slate-900 p-4 rounded-xl mb-3 flex justify-between items-center"
>

<span className="font-medium">
{item.role}
</span>

<span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
{item.match}
</span>

</div>

))}

</div>

<div>

<h3 className="font-semibold mb-3 text-lg">
Skill yang Perlu Dipelajari
</h3>

<div className="flex flex-wrap gap-2">

{result.missing_skills.map((skill, index) => (

<span
key={index}
className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium"

>

{skill}

</span>

))}

</div>

</div>

</div>

)}

{history.length > 0 && (

<div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">

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

{history.map((item) => (

<div
key={item.id}
className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl"
>

<p className="font-medium text-slate-800 dark:text-white">
{item.skills}
</p>

<p className="text-sm text-slate-500 mt-1">

{item.createdAt
? new Date(item.createdAt).toLocaleString()
: "No Date"}

</p>

</div>

))}

</div>

</div>

)}

</div>

);

}
