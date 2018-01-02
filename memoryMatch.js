// global variables
var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;
var correctAnswer = new Audio('assets/correct.mp3');
var audioVolume = correctAnswer.volume;



// start the game
setUp();

// required functions

function randomAnswers() {
  var answers = [1,1,2,2,3,3,4,4,5];
  answers.sort(function (item) {
    return 0.5 - Math.random();
  });
  return answers;
}

function setUp() {
  var grid = document.getElementsByTagName('td');
  var answers = randomAnswers();
  for(var i = 0; i < grid.length; i++){
    var cell = grid[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];

    //  event listener when mouse enters a cell
    cell.addEventListener("mouseenter", function () {
      if(!this.completed && !this.clicked){
        this.style.background = "tomato";
      }
    }); //end of first add event listener

    // event listener when mouse leaves a cell
    cell.addEventListener("mouseleave", function () {
      if(!this.completed && !this.clicked)
      this.style.background= "#33FFEE";
    });

    // event listener when  a cell gets clicked
    cell.addEventListener('click', function () {
      if(ready == false)
        return;
      startTimer();
      if(!this.clicked && !this.completed){
        clickedArray.push(this);
        reveal(this);
      }
      if(clickedArray.length == 2){
        if(clickedArray[0].value == clickedArray[1].value){
          // matching pair is found
          audioVolume = 1;
          correctAnswer.play();
          console.log(audioVolume);

          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];
          if(numCompleted == 8){
            alert("You won in " + time + "seconds");
            clearInterval(interval);
          }
        }
        else {
          // if matching pair is not found
          ready = false;
          document.getElementById('gridTable').style.border = "5px solid red";
          setTimeout(() => {
            hide(clickedArray[0]);
            hide(clickedArray[1]);

            clickedArray = [];
            ready = true;
            document.getElementById('gridTable').style.border = "5px solid black";
          }, 500);
        }
      }
    }); //end of click event listener

    // accept numpad key presses
    document.addEventListener('keydown', function (e) {
      if(e.key > 0 && e.key < 10){
        grid[e.key - 1].click();
      }
    });

    // restart the game when user presses restarts
    document.getElementById('restart').addEventListener('click', function () {
      location.reload();
    })

  }
}

// reveal value when cell clicked
function reveal(cell) {
  cell.style.background = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;

}

// start tracking elapsed time
function startTimer() {
  if(!started){
    interval = setInterval(function () {
      time++;
      document.getElementById("timer").innerHTML = "Time Elapsed " + time;
    },1000);
    started = true;
  }
}

// hide a cell
function hide(cell) {
  cell.style.background = "#33FFEE";
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.background = "#33CC66";
}