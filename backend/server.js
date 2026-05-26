const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const history = [];

app.get('/', (req, res) => {
res.send('Backend SkillMatch AI berjalan 🚀');
});

app.get('/history', (req, res) => {
res.json(history);
});

app.delete('/history', (req, res) => {

history.length = 0;

res.json({
message: 'History berhasil dihapus'
});

});

app.delete('/history', (req, res) => {

history.length = 0;

res.json({
message: 'History berhasil dihapus'
});

});

app.post('/analyze', (req, res) => {

const { skills } = req.body;

console.log('Skill user:', skills);

let recommendation = [];
let missing_skills = [];
let analysis = '';

const lowerSkills = skills.toLowerCase();

if (
lowerSkills.includes('react') ||
lowerSkills.includes('javascript') ||
lowerSkills.includes('tailwind')
) {

recommendation = [
  {
    role: 'Frontend Developer',
    match: '87%'
  },
  {
    role: 'UI/UX Engineer',
    match: '72%'
  }
];

missing_skills = [
  'Node.js',
  'REST API',
  'Git'
];

analysis =
  'Kamu memiliki dasar yang kuat di frontend development. Dengan tambahan skill seperti Node.js dan REST API, peluangmu untuk menjadi Frontend Developer profesional akan semakin besar.';

}

else if (
lowerSkills.includes('python') ||
lowerSkills.includes('machine learning')
) {


recommendation = [
  {
    role: 'Machine Learning Engineer',
    match: '90%'
  },
  {
    role: 'Data Analyst',
    match: '80%'
  }
];

missing_skills = [
  'TensorFlow',
  'Deep Learning',
  'Data Visualization'
];

analysis =
  'Skill yang kamu miliki sudah cukup relevan di bidang data dan AI. Mengembangkan kemampuan machine learning dan visualisasi data akan sangat membantu kariermu.';


}

else {

recommendation = [
  {
    role: 'Digital Specialist',
    match: '65%'
  }
];

missing_skills = [
  'Communication',
  'Problem Solving',
  'Technical Skills'
];

analysis =
  'Skill yang kamu masukkan masih umum. Coba tambahkan skill teknis atau pengalaman yang lebih spesifik agar analisis AI menjadi lebih akurat.';

}

const result = {
id: history.length + 1,
skills,
recommendation,
missing_skills,
analysis,
createdAt: new Date()
};

history.push(result);

res.json(result);

});

const PORT = 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
