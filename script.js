// Variables
let startQuiz = document.getElementById("startQuiz");
let quizBtn = document.querySelectorAll(".quizBtn");
let checkAns = document.getElementById("checkAns");
let timer = document.getElementById("timer");
let boxOne = document.getElementById("boxOne");
let boxTwo = document.getElementById("boxTwo");
let boxThree = document.getElementById("boxThree");
let boxFour = document.getElementById("boxFour");
let userName = document.getElementById("userName");
let yourScore = document.getElementById("yourScore");
let submitBtn = document.getElementById("submitNameScore");
let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
let secondsLeft = questions.length * 15;
let currentIndex = 0;
let score = 0;


// Functions
startQuiz.addEventListener("click", function() {
    startTimer();
    console.log("On Start-click current index: " + currentIndex);
    boxOne.style.display = "none";
    boxTwo.style.display = "initial";
    showQs();
});

function startTimer() {
    let interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;
        if(secondsLeft === 0) {
            clearInterval(interval);
            boxTwo.setAttribute("style", "display: none");
            boxThree.setAttribute("style", "display: initial");

        } else if(currentIndex === questions.length) {
            clearInterval(interval);
            boxTwo.setAttribute("style", "display: none");
            boxFour.setAttribute("style", "display: initial");
            if(score === null) {
                yourScore.textContent = "Your score is: 0";
            } else {
                yourScore.textContent = score;
            }
        }
    }, 1000);
};

function showQs() {
    let question = questions[currentIndex];
    document.getElementById("title").textContent = question.title;
    document.getElementById("chA").textContent = question.choices[0];
    document.getElementById("chB").textContent = question.choices[1];
    document.getElementById("chC").textContent = question.choices[2];
    document.getElementById("chD").textContent = question.choices[3];
};

for (let i = 0; i < quizBtn.length; i++) {
    quizBtn[i].addEventListener("click", function(event) {
        if (event.currentTarget.innerText === questions[currentIndex].answer) {
            score++;
            console.log("Score: " + score);
            checkAns.textContent = "Last one was CORRECT";
        } else {
            checkAns.textContent = "Last one was WRONG";
            secondsLeft -= 15;
        }
        console.log("Question Index before ++: " + currentIndex);
        currentIndex++;
        if (currentIndex < questions.length) {
            showQs();
        }
    });
};

submitBtn.addEventListener("click", function() {
    
    let initials = userName.value;

    let finalScore = {
        initials,
        score
    };

    highScores.push(finalScore);
    localStorage.setItem("highscores", JSON.stringify(highScores));
});