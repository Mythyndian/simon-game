let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  playSound(userChosenColor)
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(randomNumber);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  },100);
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)
      $("h1").text("Game Over, Press Any Key to Restart")
      console.log("wrong");
      startOver();
    }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
