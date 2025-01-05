const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Sample data for quiz questions
let quizQuestions = [
    { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
    { id: 2, question: 'Who wrote the play "Romeo and Juliet"?', options: ['William Shakespeare', 'Charles Dickens', 'Leo Tolstoy', 'Mark Twain'], answer: 'William Shakespeare' },
    { id: 3, question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], answer: 'Mars' },
    { id: 4, question: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 'Pacific Ocean' },
    { id: 5, question: 'Who painted the Mona Lisa?', options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Claude Monet'], answer: 'Leonardo da Vinci' },
    { id: 6, question: 'What is the smallest country in the world?', options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'], answer: 'Vatican City' },
    { id: 7, question: 'Which gas do plants primarily use for photosynthesis?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide' },
    { id: 8, question: 'In which year did the Titanic sink?', options: ['1905', '1912', '1920', '1898'], answer: '1912' },
    { id: 9, question: 'What is the chemical symbol for gold?', options: ['Gd', 'Au', 'Ag', 'Go'], answer: 'Au' },
    { id: 10, question: 'Who discovered penicillin?', options: ['Alexander Fleming', 'Marie Curie', 'Louis Pasteur', 'Gregor Mendel'], answer: 'Alexander Fleming' }
  ];
  


app.get('/api/questions', (req, res) => {
  res.json(quizQuestions);
});


app.post('/api/questions', (req, res) => {
  const newQuestion = req.body;
  newQuestion.id = quizQuestions.length + 1;
  quizQuestions.push(newQuestion);
  res.status(201).json(newQuestion);
});


app.put('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedQuestion = req.body;
  const questionIndex = quizQuestions.findIndex(q => q.id === id);
  if (questionIndex !== -1) {
    quizQuestions[questionIndex] = { id, ...updatedQuestion };
    res.json(quizQuestions[questionIndex]);
  } else {
    res.status(404).send('Question not found');
  }
});


app.delete('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const questionIndex = quizQuestions.findIndex(q => q.id === id);
  if (questionIndex !== -1) {
    const deletedQuestion = quizQuestions.splice(questionIndex, 1);
    res.json(deletedQuestion);
  } else {
    res.status(404).send('Question not found');
  }
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
