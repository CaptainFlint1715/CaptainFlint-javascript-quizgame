// set incorrect answers to subtract time from countdown
// set display of "correct" or "incorrect" text on screen contingent upon answers
// set up results page with form that stores score, along with stored data of high scores


var startButton = document.querySelector('#start-btn')
var header = document.querySelector('h1')
var nextButton = document.querySelector('#next-btn')
var resultsButton = document.querySelector('#results')
var questionContainerEl = document.querySelector('#question-container')
var shuffledQuestions
var currentQuestionIndex
var highScores = document.querySelector('#highscores')
var questionEl = document.querySelector('#question')
var answerButtonsEl = document.querySelector('#answer-buttons')
var rightMsg = document.querySelector('#right-answer')
var wrongMsg = document.querySelector('#wrong-answer')
var timer = document.querySelector('#countdown')
var score = 0
// var quizResults = 'quizResults'
// var scoresString = localStorage.getItem(quizResults)
// savedResults = JSON.parse(scoresString) ?? []



startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})



function startGame() {
    countdown()
    startButton.classList.add('hide')
    header.classList.add('hide')
    
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    timer.classList.remove('hide')
    questionContainerEl.classList.remove('hide')
    
    setNextQuestion()
}

function countdown() {
    var timeLeft = 60;
    var startTimer = setInterval(function () {
        if (timeLeft > 0) {
        timer.textContent = timeLeft
        timeLeft--
        } else {
            timer.textContent = ''
            clearInterval(startTimer)
            // call function taking to score/end screen
        }
    } , 1000);
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
    rightMsg.classList.add('hide')
    wrongMsg.classList.add('hide')
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        
        })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        resultsButton.classList.remove('hide')
    }    

    if (selectedBtn = correct) {
        rightMsg.classList.remove('hide')
        scoreKeeper()
    } else {
        wrongMsg.classList.remove('hide')

    }
}



function scoreKeeper() {
    score++
    return score
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

resultsButton.addEventListener('click', genResult)

function genResult() {
    resetState()
    resultsButton.classList.add('hide')
    questionEl.textContent = score + ' out of 5'

    var inputBox = document.createElement('input')
    inputBox.setAttribute('type', 'text')
    inputBox.setAttribute('placeholder', 'Initials Here')
    questionContainerEl.appendChild(inputBox)

    var msgBox = document.createElement('div')
    msgBox.setAttribute('style', 'font-size: 40%')
    questionContainerEl.appendChild(msgBox)

    var submitBtn = document.createElement('btn')
    submitBtn.setAttribute('class', 'btn')
    submitBtn.textContent = "Save Result!"
    questionContainerEl.appendChild(submitBtn)

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault()
        var initials = inputBox.value.trim()
        
        //var arrStorage = JSON.parse(localStorage.getItem('quizResults'))
        

        
       if (initials.length !== 2) {
            msgBox.textContent = "Submission must be two characters."
            inputBox.value = ''
        } else {
            msgBox.textContent = "Your result has been saved!"
            var newScore = {initials, score}
            inputBox.setAttribute('class', 'hide')
            submitBtn.setAttribute('class', 'hide')
            savedResults = JSON.parse(localStorage.getItem('quizResults')) || []
            savedResults.push(newScore)
            localStorage.setItem('quizResults', JSON.stringify(savedResults))
            highScores.classList.remove('hide')
            
        }
    })

        
}


highScores.addEventListener('click', function() {
    scoreList = document.createElement('ol')
    questionContainerEl.appendChild(scoreList)
})


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

// no running, jumping, or playing, no stairs
// keep leashed walks short and controlled and slow (limited)
// trazadone
