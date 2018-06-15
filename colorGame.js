var colors = [];
var squares = document.querySelectorAll(".square");

var rDiscover;
var gDiscover;
var bDiscover;
var seed;

var rgbDisplay = document.querySelector("#rgbDisplay");
var messageDisplay = document.querySelector("#message");
var headerDisplay = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

var difficulty = "hard";

easyButton.addEventListener("click", function(){
	difficulty = "easy";
	startApp(difficulty);
	this.classList.add("selected");
	messageDisplay.textContent = '';
	hardButton.classList.remove("selected");
	headerDisplay.style.backgroundColor = 'steelblue'
})

hardButton.addEventListener("click", function(){
	difficulty = "hard";
	headerDisplay.style.backgroundColor = 'steelblue'
	startApp(difficulty);
	this.classList.add("selected");
	messageDisplay.textContent = '';
	easyButton.classList.remove("selected");
})

resetButton.addEventListener("click", function(){
	startApp(difficulty);
	messageDisplay.textContent = '';
	resetButton.textContent = "NEW COLORS";
	headerDisplay.style.backgroundColor = 'steelblue';
})

function generateNewColors(qtd){

	seed = Math.floor(Math.random() * qtd);

	for(var i = 0; i < squares.length; i++){

		squares[i].style.display = "";

		if(i >= qtd){
			squares[i].style.backgroundColor = "#232323";
			squares[i].style.display = "none";
			continue;
		}

		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		
		colors[i] = "rgb(" + r + ", " + g + ", " + b + ")";
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.visibility = '';

		if(i === seed){
			rDiscover = r;
			gDiscover = g;
			bDiscover = b;
			rgbDisplay.textContent = colors[i].toUpperCase();
		}
	}

}

function defineSquaresFunc(){


	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			if(this.style.backgroundColor == colors[seed]){
				messageDisplay.textContent = "Correct";
				limit = 3;
				if(difficulty === "hard"){
					limit = 6;
				}
				for(var i = 0; i < limit; i++){
					squares[i].style.visibility = '';
					squares[i].style.backgroundColor = this.style.backgroundColor;
					headerDisplay.style.backgroundColor = this.style.backgroundColor;
					resetButton.textContent = "PLAY AGAIN?";
				}
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
				resetButton.textContent = "RESET";
			}
		})
	}
}

function startApp(dif){

	var squareNum = 3;
	if(dif === "hard"){
		squareNum = 6;
	}

	generateNewColors(squareNum);
}

startApp(difficulty);
defineSquaresFunc();