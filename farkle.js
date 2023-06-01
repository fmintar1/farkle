let diceArr = [];
let savedScore = 0;
let unsavedScore = 0;
let totalScore = 0;
let totalTempScore = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = (i + 1);
		diceArr[i].clicked = 0;
	}
}

/*Rolling dice values*/
function rollDice(){
	for(var i = 0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	scoreSavedCalculation();
	scoreUnsavedCalculation();
	turnScore();
	updateDiceImg();
	win();
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}
}

function scoreSavedCalculation() {
	savedScore = 0;
	if(diceArr.filter(dice => dice.value === 1 && dice.clicked === 1).length === 6) {
		savedScore += 2000;
	} else if (diceArr.filter(dice => dice.value === 1 && dice.clicked === 1).length >= 3) {
		savedScore += 1000;
	}
	for(let s = 2; s <= 6; s++) {
		if(diceArr.filter(dice => dice.value === s && dice.clicked === 1).length === 6) {
			savedScore += (s*200);
		} else if (diceArr.filter(dice => dice.value === s && dice.clicked === 1).length >= 3) {
			savedScore += (s*100);
		}
	}
	for (let t = 0; t < 6; t++) {
		if(diceArr[t].value === 1 && diceArr[t].clicked === 1) {
			savedScore += 100;
		} else if (diceArr[t].value === 5 && diceArr[t].clicked === 1) {
			savedScore += 50;
		}
	}
}

function scoreUnsavedCalculation() {
	unsavedScore = 0;
	if(diceArr.filter(dice => dice.value === 1 && dice.clicked === 0).length === 6) {
		unsavedScore += 2000;
	} else if (diceArr.filter(dice => dice.value === 1 && dice.clicked === 0).length >= 3) {
		unsavedScore += 1000;
	}
	for(let s = 2; s <= 6; s++) {
		if(diceArr.filter(dice => dice.value === s && dice.clicked === 0).length === 6) {
			unsavedScore += (s*200);
		} else if (diceArr.filter(dice => dice.value === s && dice.clicked === 0).length >= 3) {
			unsavedScore += (s*100);
		}
	}
	for (let t = 0; t < 6; t++) {
		if(diceArr[t].value === 1 && diceArr[t].clicked === 0) {
			unsavedScore += 100;
		} else if (diceArr[t].value === 5 && diceArr[t].clicked === 0) {
			unsavedScore += 50;
		}
	}
}

function turnScore(){
	totalTempScore = unsavedScore + savedScore;
	if (unsavedScore === 0) {
		alert("Farkle!");
		totalTempScore = 0;
	}
	let divElement = document.getElementById("tempScore");
    	divElement.textContent = totalTempScore;
}

function bankScore() {
	totalScore = totalScore + unsavedScore + savedScore;
	let divElement = document.getElementById("bankScore");
    	divElement.textContent = totalScore;
}

function win() {
	if (totalScore >= 10000) {
		alert("YOU WIN!");
	}
}