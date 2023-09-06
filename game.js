// document.querySelector("h1").addEventListener("click",function(){
//     alert("Hello");
// })

var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var isGameStart = false;
var level = 0;


$(document).on("keypress",function(){
    if(!isGameStart){
        nextSequence();
        isGameStart=true;
    }
    
})

function nextSequence(){
    $("#level-title").html("Level" +" " + ++level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    
    playSound(randomChosenColour);
}
// ******** USING ANOTHER METHOD FOR AUDIO *******

function playSound(choosenColour){
    var audio = new Audio("sounds/" + choosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" +currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" +currentColour).removeClass("pressed");
    },100);
}

$(".btn").click( function(){
    var userChoosenColour = this.id;
    // console.log(userChoosenColour);
    userClickedPattern.push(userChoosenColour);
    console.log(userClickedPattern);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level = 0;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
        playSound("wrong");
        $("body").addClass("game-over");
        $('h1').text("Game Over, Press Any Key to Restart.");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        isGameStart=false;
        startOver();
    }
    
    else if(gamePattern.length === userClickedPattern.length){
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    
}






