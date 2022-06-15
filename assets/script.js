const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
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

const questions = [
  {
    question: 'What does the Bible say in John 3:16?',
    answers: [
      { text: 'For God so loved the world that he sent His only Son to die for our sins', correct: true },
      { text: 'Jesus loves the sinners and calls them to be saints', correct: false }
    ]
  },
  {
    question: 'Who is the disciple known as the one whom Jesus loved?',
    answers: [
      { text: 'Peter', correct: false },
      { text: 'John', correct: true },
      { text: 'James', correct: false },
      { text: 'Matthew', correct: false }
    ]
  },
  {
    question: 'Is there space in heaven for all of humanity?',
    answers: [
      { text: 'Definitely', correct: true },
      { text: 'YES!!!', correct: true },
      { text: 'Um duh', correct: true },
      { text: 'Of course', correct: true }
    ]
  },
  {
    question: 'What is Grace?',
    answers: [
      { text: 'the divine favour shown by God to humanity, drawing them to be saved and sanctified in Him', correct: true },
      { text: 'being kind', correct: false }
    ]
  }
]
