//GVs
var startQuizButton = document.querySelector("#startQuiz");
var startButtonDiv = document.querySelector("#startButton")
var timer = document.querySelector("#seconds");
var quizQuestionsDiv = document.querySelector("#quizQuestions");
var quizChoicesDiv = document.querySelector("#quizChoices");
var selectionA = document.querySelector("#A")
var selectionB = document.querySelector("#B")
var selectionC = document.querySelector("#C")
var selectionD = document.querySelector("#D")
var resultDiv = document.querySelector("#result")
var buttonsEl = document.querySelector(".btn")
var isCorrect = true
var input = document.getElementById("saveScore");
var highScoreList = []
var newForm = document.createElement("form");
var input = document.createElement("input");
var submit = document.createElement("input");

var userScore = 0
var currentQuestion = 0

var time = 500

function startTimer() {
  time = 500
  userScore = 0
  currentQuestion = 0
  interval = setInterval(function () {
    time--;
    timer.textContent = time
  }, 100);
}

//Start quiz
function startQuiz() {
  startTimer()
  startButtonDiv.innerHTML = ""
  resultDiv.innerHTML = ""

  quizQuestionsDiv.innerHTML = questions[currentQuestion].title

  for (i = 0; i < 4; i++) {
    var buttons = document.createElement("button");
    buttons.innerHTML = questions[currentQuestion].choices[i];
    quizChoicesDiv.children[i].append(buttons);
    buttons.className = "button1";
  }
}

selectionA.addEventListener("click", function () {
  if (questions[currentQuestion].choices[0] === questions[currentQuestion].answer) {
    isCorrect = true;
    displayResult();
  }
  else {
    isCorrect = false;
    displayResult();
  }
})

selectionB.addEventListener("click", function () {
  if (questions[currentQuestion].choices[1] === questions[currentQuestion].answer) {
    isCorrect = true;
    displayResult();
  }
  else {
    isCorrect = false;
    displayResult();
  }
})

selectionC.addEventListener("click", function () {
  if (questions[currentQuestion].choices[2] === questions[currentQuestion].answer) {
    isCorrect = true;
    displayResult();
  }
  else {
    isCorrect = false;
    displayResult();
  }
})

selectionD.addEventListener("click", function () {
  if (questions[currentQuestion].choices[3] === questions[currentQuestion].answer) {
    isCorrect = true;
    displayResult();
  }
  else {
    isCorrect = false;
    displayResult();
  }
})

//Display results
function displayResult() {
  if (isCorrect === true) {
    userScore = userScore + 10;
    resultDiv.innerHTML = "<hr>" + "Good job you were correct, you have.. " + userScore + " points";
    increaseQuestion();
  }
  else {
    time = time - 10;
    resultDiv.innerHTML = "<hr>" + "Ehhhh you were wrong, you have.. " + userScore + " points";;
    increaseQuestion();
  }
}

function increaseQuestion() {
  currentQuestion++;

  //End Quiz 
  if (currentQuestion === 11 || time < 0) {
    clearInterval(interval)
    quizQuestionsDiv.innerHTML = "Quiz is Complete!" + "<hr>" + "Congratulations, you have " + userScore + " points!" + "<br>"
    selectionA.innerHTML = ""
    selectionB.innerHTML = ""
    selectionC.innerHTML = ""
    selectionD.innerHTML = ""
    resultDiv.innerHTML = ""
    timer.innerHTML = ""
    highScore()
  }
  else {
    renderNextQuestion();
  }
}


function highScore() {

  resultDiv.appendChild(newForm);
  input.setAttribute('type', "text");
  input.setAttribute('name', "initals");
  input.className = "inputInitials"
  submit.setAttribute('type', "submit");
  submit.setAttribute('value', "Submit");
  submit.className = "submitButton"
  newForm.appendChild(input);
  newForm.appendChild(submit);


  newForm.addEventListener("submit", function () {
    event.preventDefault();
    quizQuestionsDiv.innerHTML = "High Score List"
    var result = { initals: input.value, score: userScore }
  })

  restartButton = document.createElement('button')
  startButtonDiv.append(restartButton)
  restartButton.innerHTML = "Restart Quiz"
  restartButton.addEventListener("click", startQuiz);
}

function renderNextQuestion() {
  quizQuestionsDiv.innerHTML = questions[currentQuestion].title;
 
  selectionA.childNodes[0].innerHTML = questions[currentQuestion].choices[0];
  selectionB.childNodes[0].innerHTML = questions[currentQuestion].choices[1];
  selectionC.childNodes[0].innerHTML = questions[currentQuestion].choices[2];
  selectionD.childNodes[0].innerHTML = questions[currentQuestion].choices[3];
}

startQuizButton.addEventListener("click", startQuiz);