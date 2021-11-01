// List of Variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("quiz-questions");
var startBtn = document.getElementById("start");
var choicesEl = document.getElementById("options");
var submitBtn = document.getElementById("enter");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Functionality for beginning the Quiz/Clock
function startQuiz() {
    // Hide Start Screen 
    var startScreen = document.getElementById("initial-screen");
    startScreen.setAttribute("class", "start hide");
  
    // Display Question
    questionsEl.setAttribute("class", " ");
    // Clock Start
    timerId = setInterval(function(){
      clockTick();
    }, 1000);
    // Starting Time
    timerEl.textContent = time;
  
    getQuestion();
}

function getQuestion() {
    // Fetch Question from Array
    var currentQuestion = questions[currentQuestionIndex];
    // Update Question Title
    questionsEl.children[0].textContent = currentQuestion.title;
    // Clear Previous Question/Options
    while (choicesEl.hasChildNodes()) {
      choicesEl.removeChild(choicesEl.lastChild);
    }

    for(var i = 0; i < currentQuestion.choices.length; i++){
  
      var choiceButton = document.createElement("button");
      choiceButton.textContent = currentQuestion.choices[i];
      
      choicesEl.appendChild(choiceButton);
    }
    // Event Listeners for Question Clicks
    choicesEl.children[0].addEventListener("click", function(event){
      questionClick(choicesEl.children[0]);
    });
    choicesEl.children[1].addEventListener("click", function(event){
      questionClick(choicesEl.children[1]);
    });
    choicesEl.children[2].addEventListener("click", function(event){
      questionClick(choicesEl.children[2]);
    });
    choicesEl.children[3].addEventListener("click", function(event){
      questionClick(choicesEl.children[3]);
    });
}

function questionClick(answerChoice) {
    // If-Statement to determine incorrect response
    if(answerChoice.textContent != questions[currentQuestionIndex].answer){
      time -= 15;
      feedbackEl.textContent = "Incorrect";
    }
    else{
    // Tell User that they answered correctly
      feedbackEl.textContent = "Correct";
    }

    // Correct/Incorrect Answer Indicator
    feedbackEl.setAttribute("class", "feedback");
    setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
    }, 500);

    // Check if eligible to move to Next Question
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length)
    quizEnd();

    else
    getQuestion();
}

function quizEnd() {
    
    clearInterval(timerId);
    timerEl.textContent = time;
  
    // Quiz Finished
    var endScreenEl = document.getElementById("quiz-finished");
    endScreenEl.setAttribute("class", " ");
  
    // Display Final Score
    var finalScoreEl = document.getElementById("final-results");
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute("class", "hide");
}
  
function clockTick() {
    time--;
    timerEl.textContent = time;
  
    // Verify if there is still time remaining
    if(time <= 0)
      quizEnd();
    
}

function saveHighscore() {
    
    var initials = initialsEl.value.toUpperCase();

    if(initials === ""){ 
      alert("This cannot be left blank");
      return;
    }
    else if(initials.length > 3){
      alert("You CAN use up to 3 characters");
      return;
    }
    else{
      // Saving from LocalStorage/Or setting up new Array
      var highscores;
      if(JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
      else
        highscores = [];
      // format new score object for current user
      var newScore = {
        initials: initials,
        score: time
      };
      
      // save to localstorage
      localStorage.setItem("highscores", JSON.stringify(highscores));
      // redirect to next page
      location.href = "scorelist.html";
    }
}
  
function checkForEnter(event) {
      // Saving Score
      if(event.keyCode === 13)
        saveHighscore();

}
  submitBtn.onclick = saveHighscore;

  startBtn.onclick = startQuiz;

  initialsEl.onkeyup = checkForEnter;

