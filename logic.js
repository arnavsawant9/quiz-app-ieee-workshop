// Updated logic.js with navigation feature
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:3050/api/questions');
        questions = await response.json();
        displayQuestion(currentQuestionIndex);
    } catch (error) {
        quizContainer.innerHTML = 'Error loading questions. Please try again later.';
    }
}

function displayQuestion(index) {
    quizContainer.innerHTML = ''; // Clear previous question

    if (index >= 0 && index < questions.length) {
        const question = questions[index];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        questionElement.innerHTML = `<strong>${question.id}. ${question.question}</strong>`;

        question.options.forEach(option => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="question${question.id}" value="${option}"> ${option}
            `;
            questionElement.appendChild(label);
            questionElement.appendChild(document.createElement('br'));
        });

        const navButtons = document.createElement('div');
        navButtons.className = 'navigation';

        if (index > 0) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => displayQuestion(index - 1));
            navButtons.appendChild(prevButton);
        }

        if (index < questions.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => displayQuestion(index + 1));
            navButtons.appendChild(nextButton);
        } else {
            submitButton.style.display = 'block';
        }

        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(navButtons);
    }
}

function checkAnswers() {
    let score = 0;
    questions.forEach(question => {
        const selectedAnswer = document.querySelector(`input[name="question${question.id}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.answer) {
            score++;
        }
    });
    resultContainer.textContent = `Your score is ${score} out of ${questions.length}`;
}

submitButton.addEventListener('click', checkAnswers);
submitButton.style.display = 'none';

loadQuestions();
