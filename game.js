let gameSoundObj = {
 blue:"./sounds/blue.mp3",
 green:"./sounds/green.mp3",
 red:"./sounds/red.mp3",
 wrong:"./sounds/wrong.mp3",
 yellow:"./sounds/yellow.mp3"
}
let gameArr = ["blue", "green" , "red" , "yellow"]
var playerArr = [];
var gameGeneratorArr = [];
 let level ;
 let gameStarted = false;
var gameResetText = "Press A Key to Start"
var gameProgressText = "Level"
var gameLostText = "Game Lost"

function gameSound(path){
     if (path)
      {let soundObject = new Audio(path);
         soundObject.play();  }
    }

function produceButtonSound(soundArr){
      for (let i = 0 ; i < soundArr.length ; i++){
       let path = gameSoundObj[soundArr[i]];
       setTimeout(function(){ 
       gameSound(path);
       applyAnimationToButton(soundArr[i]);}, 700 * i)
     }
    }

function resetGame (){
     playerArr = [];
     gameGeneratorArr = [];
     level = 1;
     gameStarted = false;
     gameSound(gameSoundObj.wrong);
     setTimeout(function(){setHeader(gameLostText);},800);
     setTimeout(function(){setHeader(gameResetText);},1600);
    }
    
    
function setHeader(name){
    $("#level-title").text(name);}

function applyAnimationToButton(id){
    
     $("#"+id).addClass("pressed");
     setTimeout(function() {$("#"+id).removeClass("pressed");},100);
    }

function generateNextLevelColor(){
    //set H1 level to player
    setHeader(gameProgressText+" "+level)
    //generate random color and add to arr
        let ran = Math.floor((Math.random() * 4));  
        gameGeneratorArr.push(gameArr[ran]);
    //show the game generated sequence
         produceButtonSound(gameGeneratorArr)
   }


function checkTurn(){
    console.log(level);
     var index = playerArr.length - 1;
     if (gameGeneratorArr[index] !== playerArr[index]){
         resetGame();
         playGame();
         return; }

     if (gameGeneratorArr.length == playerArr.length){
         setTimeout(function(){setHeader("Checking");},500)
         setTimeout(function(){setHeader("Won");},1000)
          playerArr = [];
          level ++;
          setTimeout(function(){generateNextLevelColor();},1500)
         }
    }      


function playGame () {
    // start game
    $(document).one("click" , function () { 
        level = 1;
        gameStarted = true;
        generateNextLevelColor()
    });
  }
  
  $(".btn").click(function() {
     if(!gameStarted) return;
     let color = this.classList[1] ;
     let path = gameSoundObj[color];
     gameSound(path);
     playerArr.push(color);
     checkTurn();
  }
 )

playGame();



