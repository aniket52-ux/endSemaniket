const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let students = [
  { id: 1, name: "Aniket", marks: 85 },
  { id: 2, name: "Amit", marks: 92 },
  { id: 3, name: "Roushan", marks: 30},

];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, marks } = req.body;
  if (typeof name !== 'string' || typeof marks !== 'number') {
    return res.status(400).json({ error: "Invalid input." });
  }
  const newId = students.length ? students[students.length - 1].id + 1 : 1;
  const newStudent = { id: newId, name, marks };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found." });
  }
  res.json(student);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

