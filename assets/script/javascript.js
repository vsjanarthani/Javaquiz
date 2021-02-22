// Initializing DOM Elements & variables
const startQuizEl = document.querySelector('.start');
const questionEl = document.getElementById('question-display');
const optionOneEl = document.getElementById('Button1');
const optionTwoEl = document.getElementById('Button2');
const optionThreeEl = document.getElementById('Button3');
const optionFourEl = document.getElementById('Button4');
var timeValueEl = document.getElementById('timervalue');
var divEl = document.querySelector('.user-answer');
var h2El = document.querySelector('.show-result');
var clickedEl = document.getElementById('answer-display');
var scoreEl = document.getElementById('score');
var scoreValEl = document.getElementById('score-value');
var highscoreEl = document.getElementById('high-score');
var headerEl = document.getElementById('head');
var sectionEl = document.getElementById('start');
var paraEl = document.getElementById('highscores');

var currentIndex;



// creating an array of questions, answers and options
var questions = [
    {
        slNo: 1,
        question: "Commonly used date types DO Not Include:",
        button1: "1. strings",
        button2: "2. booleans",
        button3: "3. alerts",
        button4: "4. numbers",
        answer: "3. alerts"
    },
    {
        slNo: 2,
        question: "The condition in an if/else statement is enclosed with_______.",
        button1: "1. quotes",
        button2: "2. curly brackets",
        button3: "3. parenthesis",
        button4: "4. square brackets",
        answer: "2. curly brackets"
    },
    {
        slNo: 3,
        question: "Arrays in JavaScript can be used to store______.",
        button1: "1. numbers and strings",
        button2: "2. other arrays",
        button3: "3. booleans",
        button4: "4. all of the above",
        answer: "4. all of the above"
    },
    {
        slNo: 4,
        question: "String values must be enclosed within _____ when being assigned to variables.",
        button1: "1. commas",
        button2: "2. curly brackets",
        button3: "3. quotes",
        button4: "4. parenthesis",
        answer: "3. quotes"
    },
    {
        slNo: 5,
        question: "What is the scope of a variable that is declared using ‘let’ keyword inside a function:",
        button1: "1. global scope",
        button2: "2. function scope",
        button3: "3. no scope",
        button4: "4. block scope", 
        answer: "4. block scope" 
    },
    {
        slNo: 6,
        question: "A very useful tool used during developing and debugging for printing content to the debugger is:",
        button1: "1. javascript",  
        button2: "2. terminal/bash",
        button3: "3. for loops",
        button4: "4. console.log",  
        answer: "4. console.log"
    }   
]

// Start Quiz function
startQuizEl.addEventListener('click', function() {
    var displayEl = document.getElementById("form");
    displayEl.classList.add("active");
    randomQuiz();
    startTimer();
   
});

// function to display timer
var timeLeft = 60;
var timer;
function startTimer() {
timer = setInterval(() => {
    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timer);
    } else {
        timeLeft--;
        timeValueEl.textContent = timeLeft;
    }
}, 1000); 
}    

// Function to set next question
function randomQuiz() {
    shuffledQues = questions.sort(() => Math.random() - .5);
    currentIndex = 0;
    nextQuiz();
}

// Function to set questions
function nextQuiz() {
    if (timeLeft >0 && currentIndex < shuffledQues.length) {
        displayQuiz(shuffledQues[currentIndex]); 
    } else {
        displayScore();
    } 
}

// function to display next question
function displayQuiz(ques) {
    resetDiv();
    questionEl.innerText = ques.question;
    optionOneEl.textContent = ques.button1;
    optionTwoEl.textContent = ques.button2;
    optionThreeEl.textContent = ques.button3;
    optionFourEl.textContent = ques.button4;
    correctAns = ques.answer;  
        
}

// Event listner for clicking on the options
clickedEl.addEventListener('click', function(event) {
    if (event.target.classList == "choice") {
        var userAns = event.target.textContent;
        verifyAns(userAns);
        currentIndex = currentIndex + 1;
        nextQuiz();
    }
});
            
// Function to verify answer
function verifyAns(userAns) {
// Verifying if user answer is equal to answer in the array with the index of current index
    if (userAns == correctAns) {
        divEl.classList.add("show");
        h2El.textContent = "Correct!"
        console.log("this is the correct answer", correctAns);
    } else {
        divEl.classList.add("show");
        h2El.textContent = "Wrong!"
        timeLeft = timeLeft - 10;
        console.log("This is wrong answer", userAns + "Correct Ans is", correctAns);
    }
}

// Function to reset the div element
function resetDiv() {
    document.getElementById('answer-display').addEventListener('mouseleave', event => {
        if (event.target.classList != "choice") {
            divEl.classList.remove("show");
        }
    });
}

// function to display and store highscore
function displayScore() {
    clearInterval(timer);
    scoreEl.classList.add("showit");
    if (timeLeft <= 0) {
        timeLeft = 0;
        scoreValEl.innerText = timeLeft;
        timeValueEl.textContent = timeLeft;
    } else {
        scoreValEl.innerText = timeLeft;
        timeValueEl.textContent = timeLeft;
    }
}

// Function to store timeleft in local storage
function storeData() {
    var score = timeLeft;
    var initial = document.querySelector('#initial').value;
    console.log(score);
    console.log(initial);
    localStorage.setItem('initial', initial); 
    localStorage.setItem('score', score);
    displayHighScore();
}

// Function to display High score
function displayHighScore() {
    highscoreEl.classList.add("showme");
    headerEl.classList.add("hide");
    sectionEl.classList.add("hide");
    if (paraEl.value != null) {
        paraEl.textContent = localStorage.getItem('initial') + " : " + localStorage.getItem('score');
    } else {
        paraEl.innerText = "Nothing to display at the moment.";
    }
    
}

// Function to clear storage
function clearData() {
    localStorage.clear();
    paraEl.innerText = "Storage Cleared. Nothing to display at the moment.";
}

// Function to go back to homepage
function goBack() {
    headerEl.classList.remove("hide");
    sectionEl.classList.remove("hide");
    highscoreEl.classList.remove("showme");
}