let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const data = await response.json();
    questions = data.results;
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    questionElement.textContent = question.question;

    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);

    document.getElementById('final-score-container').style.display = 'none';

    optionsElement.innerHTML = '';
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option === question.correct_answer);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(isCorrect) {
    const userAnswerElement = document.getElementById('user-answer');
    const correctAnswerElement = document.getElementById('correct-answer');
    const scoreElement = document.getElementById('score');

    if (isCorrect) {
        score++;
        userAnswerElement.textContent = 'Your answer is correct!';
    } else {
        userAnswerElement.textContent = 'Your answer is incorrect!';
    }

    correctAnswerElement.textContent = `Correct answer: ${questions[currentQuestionIndex].correct_answer}`;
    scoreElement.textContent = score;

    document.getElementById('result-container').style.display = 'block';;
    document.getElementById('question-container').style.display = 'none';

    nextButton.style.display = 'block'

    
}

function nextQuestion() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    //document.getElementById('next-button').style.display = 'none'; // Hide next button before displaying the next question

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('score-container').style.display = 'none';
        document.getElementById('final-score-container').style.display = 'block';
        document.getElementById('final-score').textContent = score;
        alert('You have completed the quiz! Final score: ' + score);
    }
}
/*
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question-container').style.display = 'block';
        displayQuestion();
    } else {
        alert('You have completed the quiz! Final score: ' + score);
    }
}
*/
fetchQuestions();