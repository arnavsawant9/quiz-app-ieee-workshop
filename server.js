const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
const path = require('path')

app.use(bodyParser.json());

const filePath = path.join(__dirname, 'questions.json')

const cors = require('cors');
app.use(cors());

// Sample data for quiz questions
let quizQuestions = require("./questions.json")
  


app.get('/api/questions', (req, res) => {
  res.json(quizQuestions);
});


app.post('/api/add', (req, res) => {

  const key = req.query.apikey

  if (key !== 'ieee-vesit') {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  const newQuestion = req.body;
  newQuestion.id = quizQuestions.length + 1;
  quizQuestions.push(newQuestion);
  
  fs.writeFile(filePath, JSON.stringify(quizQuestions, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file', err);
      return res.status(500).json({ error: 'Failed to add question to file' });
    }

    res.status(201).json(newQuestion);
  });
});


app.put('/api/update/:id', (req, res) => {

  const key = req.query.apikey

  if (key !== 'ieee-vesit') {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  const id = parseInt(req.params.id);
  const updatedQuestion = req.body;
  const questionIndex = quizQuestions.findIndex(q => q.id === id);
  if (questionIndex !== -1) {
    quizQuestions[questionIndex] = { id, ...updatedQuestion };
    res.json(quizQuestions[questionIndex]);

    fs.writeFile(filePath, JSON.stringify(quizQuestions, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return res.status(500).json({ error: 'Failed to update question in file' });
      }

      res.json(quizQuestions[questionIndex]);
    });
  } else {
    res.status(404).send('Question not found');
  }
});


app.delete('/api/delete/:id', (req, res) => {

  const key = req.query.apikey

  if (key !== 'ieee-vesit') {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  const id = parseInt(req.params.id);
  const questionIndex = quizQuestions.findIndex(q => q.id === id);
  if (questionIndex !== -1) {
    const deletedQuestion = quizQuestions.splice(questionIndex, 1);
    
    fs.writeFile(filePath, JSON.stringify(quizQuestions, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return res.status(500).json({ error: 'Failed to delete question from file' });
      }

      res.json(deletedQuestion);
    });
  } else {
    res.status(404).send('Question not found');
  }
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
