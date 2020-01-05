// Variables
let highscoreList = document.getElementById("highscore-list");
let clear = document.getElementById("clear");
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];


// Functions
document.addEventListener("DOMContentLoaded", displayHighscores);

function displayHighscores() {

    highscores = sortScores(highscores);
    for (let i = 0; i < highscores.length; i++) {

        let newScore = document.createElement("li");
        newScore.textContent = highscores[i].initials + ": " + highscores[i].score;
        console.log(newScore);
        highscoreList.appendChild(newScore);
    }
};

function sortScores(array) {

    return array.sort(function (a, b) {

        if (a.score < b.score) {
            return 1;
        }
        return -1;
    });
};

clear.addEventListener("click", function () {

    localStorage.removeItem("highscores");
    window.location.reload();
});