let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let start = false;

$(".btn").on("click", function (event) {
    playSound(event.currentTarget.id)
    userClickedPattern.push(event.currentTarget.id);
    animatePress(event.currentTarget.id)
    check();
})

$("body").on("keypress", function (event) {
    if (!start) {
        nextSequence();
    }
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    if (!start) {
        start = true;
        $("h1").text("Level " + level);
    } else {
        level++;
        $("h1").text("Level " + level);
    }

    playPattern();

}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed")
    setTimeout(function () {
        $(`.${currentColour}`).removeClass("pressed")
    }, 100);
}

function check() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            wrong();
            return -1;
        }
    }
    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern.length = 0;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }

}

function wrong() {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    start = false;
    level = 0;
}

async function playPattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        $(`#${gamePattern[i]}`).fadeOut(50).fadeIn(50);
        playSound(gamePattern[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}