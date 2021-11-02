function actualTime(){
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	if (hour<10) hour = '0'+hour;
	var minute = today.getMinutes();
	if (minute<10) minute = '0'+minute;
	var second = today.getSeconds();
	if (second<10) second = '0'+second;
	document.getElementById("timer").innerHTML = day+"."+month+"."+year+" | "+hour+":"+minute+":"+second+" | &copyGyros";
	setTimeout("actualTime()",1000);
}
var one = 900;
var two = 900;
var minutesone = Math.floor(one/60);
var minutestwo = Math.floor(two/60);
var secondone = one%60;
var secondtwo = two%60;
var flaggame = false;
var flagone = true;
var flagtwo = false;
var flagstop = false;
var flagtimechange = true;
var timerOne = document.querySelector(".flex-item-timer-one");
var timerTwo = document.querySelector(".flex-item-timer-two");

function changeValueTime() {
    minutesone = Math.floor(one/60);
    minutestwo = Math.floor(two/60);
    secondone = one%60;
    secondtwo = two%60;
}
function resetColor() {
    timerOne.style.setProperty("background-color", "blue");
    timerTwo.style.setProperty("background-color", "red");
    timerOne.style.setProperty("border-color", "yellow");
    timerTwo.style.setProperty("border-color", "yellow");
}
function changeOneColor() {
    timerOne.style.setProperty("background-color", "#4BA2EA");
    timerTwo.style.setProperty("background-color", "red");
    timerOne.style.setProperty("border-color", "white");
    timerTwo.style.setProperty("border-color", "yellow");
}
function changeTwoColor() {
    timerOne.style.setProperty("background-color", "blue");
    timerTwo.style.setProperty("background-color", "#ff9999");
    timerOne.style.setProperty("border-color", "yellow");
    timerTwo.style.setProperty("border-color", "white");
}

var time = document.querySelector("#time-chose");
time.onchange = function() {
    if (flagtimechange) {
        var valueTime = document.querySelector("#time-chose").value;
        valueTime = " "+valueTime
        document.querySelector("#time-value").innerText=valueTime;
        one = valueTime*60;
        two = valueTime*60;
        changeValueTime()
        setTime();
    }
};

function setTime() {
    secondonetrue = secondone;
    secondtwotrue = secondtwo;
    if (secondone<10&&secondone>=0) {
        secondonetrue = "0"+secondone;
    }
    if (secondtwo<10&&secondtwo>=0) {
        secondtwotrue = "0"+secondtwo;
    }
    if (secondone!=60) {
        document.getElementById("one-timer").innerHTML = minutesone+":"+secondonetrue;
    }
    if (secondtwo!=60) {
        document.getElementById("two-timer").innerHTML = minutestwo+":"+secondtwotrue;
    }
}

const resetButton = document.querySelector(".options-list-reset");
function reset() {
    one=900;
    two=900;
    time.value=15;
    document.querySelector("#time-value").innerText=" 15";
    changeValueTime()
    setTime();
    flaggame = false;
    flagone = true;
    flagtwo = false;
    flagstop = false;
    flagtimechange = true;
    resetColor();
}
resetButton.addEventListener("click", reset);

const pauseButton = document.querySelector(".options-list-pause");
function pause() {
    flaggame = false;
}
pauseButton.addEventListener("click", pause);


const timerChangerOne = document.querySelector(".flex-item-timer-one");
const timerChangerTwo = document.querySelector(".flex-item-timer-two");
function elementClickOne() {
    if (!flaggame) {
        flaggame=true;
        flagone=true;
        flagtwo=false;
        flagtimechange=false;
        changeOneColor();
        downTime();
    }
    else if (!flagone) {
        flagone = true;
        flagtwo = false;
        changeOneColor();
    }
}
function elementClickTwo() {
    if (!flaggame) {
        flaggame=true;
        flagone=false;
        flagtwo=true;
        flagtimechange=false;
        changeTwoColor();
        downTime();
    }
    else if (!flagtwo) {
        flagone = false;
        flagtwo = true;
        changeTwoColor();
    }
}
timerChangerOne.addEventListener("click", elementClickOne);
timerChangerTwo.addEventListener("click", elementClickTwo);
function removeEvent() {
    timerChangerOne.removeEventListener("click", elementClickOne);
    timerChangerTwo.removeEventListener("click", elementClickTwo);
}

window.addEventListener('keydown', function(event) {
    var key = event.keyCode;
    //start space
    if (key == 32) {
        if (!flaggame&&!flagstop) {
            flaggame=true;
            flagtimechange=false;
            if (flagone) {
                changeOneColor();
            }
            if (flagtwo) {
                changeTwoColor();
            }
            downTime();
        }
        else if (!flagone&&flaggame) {
            flagone = true;
            flagtwo = false;
            changeOneColor();
        }
        else if (!flagtwo&&flaggame) {
            flagone = false;
            flagtwo = true;
            changeTwoColor();
        }
    }
    //pauza esc
    if (key==27) {
        flaggame=false;
    }
    //reset r
    if (key==82) {
        reset();
    }
});

function downTime() {
    var secondonetrue = secondone;
    var secondtwotrue = secondtwo;

    if (secondone<10&&secondone>=0) {
        secondonetrue = "0"+secondone;
    }
    if (secondtwo<10&&secondtwo>=0) {
        secondtwotrue = "0"+secondtwo;
    }
    if ((minutesone!=0||secondone!=0)&&(minutestwo!=0||secondtwo!=0)) {
        if (flagone) {
            document.getElementById("one-timer").innerHTML = minutesone+":"+secondonetrue;
        }
        if (flagtwo) {
            document.getElementById("two-timer").innerHTML = minutestwo+":"+secondtwotrue;
        }
    }
    if (flagone&&secondone!=0) {
        secondone = secondone-1;
    }
    else if (flagone&&secondone==0) {
        minutesone = minutesone-1;
        secondone = 59;
    }
    else if (flagtwo&&secondtwo!=0) {
        secondtwo = secondtwo-1;
    }
    else if (flagtwo&&secondtwo==0) {
        minutestwo = minutestwo-1;
        secondtwo = 59;
    }
    
    if (minutesone==0 && secondone==0) {
        flaggame=false;
        document.getElementById("one-timer").innerHTML = "Porażka";
        document.getElementById("two-timer").innerHTML = "Wygrana";
        removeEvent();
        flagstop=true;
    }
    if (minutestwo==0 && secondtwo==0) {
        flaggame=false;
        document.getElementById("one-timer").innerHTML = "Wygrana";
        document.getElementById("two-timer").innerHTML = "Porażka";
        removeEvent();
        flagstop=true;
    }
    if (flaggame) {
        setTimeout("downTime()",1000);
    }
}

function start() {
    actualTime();
    setTime();
}
window.onload = start;