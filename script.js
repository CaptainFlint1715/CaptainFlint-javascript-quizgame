var startButton = document.querySelector('#start-btn')
var header = document.querySelector('h1')
var nextButton = document.querySelector('#next-btn')
var questionContainerEl = document.querySelector('#question-container')
var shuffledQuestions
var currentQuestionIndex
var questionEl = document.querySelector('#question')
var answerButtonsEl = document.querySelector('#answer-buttons')
var correct = document.querySelector('#right-answer')
var incorrect = document.querySelector('#wrong-answer')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    header.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }

}

function selectAnswer(e) {
    var selButton = e.target
    var correct = selButton.dataset.correct
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        })
     if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
     } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
     }

     }


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: 'What is/are contained within the parentheses of a function declaration?',
        answers: [
            {text: 'parameters', correct: true},
            {text: 'definition', correct: false},
            {text: 'scope', correct: false},
            {text: 'array', correct: false}
        ]
    },
    {
        question: 'Inside which element do we put the JavaScript?',
        answers: [
            {text: '<scripting>', correct: false},
            {text: '<js>', correct: false},
            {text: '<script>', correct: true},
            {text: '<java>', correct: false}
        ]
    },
    {
        question: 'How do you write "Hello World" in the alert box?',
        answers: [
            {text: 'msgBox("Hello Word")', correct: false},
            {text: 'alert("Hello World")', correct: true},
            {text: 'alertBox("Hello World")', correct: false},
            {text: 'msg("Hello World")', correct: false}
        ]
    },
    {
        question: 'How do you call a function named "helloWorld"?',
        answers: [
            {text: 'call function helloWorld()', correct: false},
            {text: 'call helloWorld()', correct: false},
            {text: 'helloWorld', correct: false},
            {text: 'helloWorld()', correct: true}
        ]
    },
    {
        question: 'How can you add a comment in JavaScript?',
        answers: [
            {text: '//comment', correct: true},
            {text: '::comment', correct: false},
            {text: '<!--comment-->', correct: false},
            {text: '/comment', correct: false}
        ]
    }
]


