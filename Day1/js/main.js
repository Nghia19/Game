var diem = 0;
var kq = 0;
function clearAndset() {
  var TIME_LIMIT = 30;
  var TIME_PASSED = 0;
  var TIME_LEFT = TIME_LIMIT;
  // tính toán thời gian
  const MINUTE = (TIME_LIMIT / 60).toFixed(1);
  let SECOND;
  if (MINUTE >= 1) {
    // Set thời gian lên giao diện
    const SECOND = TIME_LIMIT - 60 * MINUTE;
    if (SECOND < 10) {
      document.querySelector(".second").innerHTML = "0" + SECOND;
    }
  } else if (MINUTE < 1) {
    // Set thời gian lên giao diện
    document.querySelector(".minute").innerHTML = "00";
    document.querySelector(".second").innerHTML = TIME_LIMIT;
  }
}
window.addEventListener("load", clearAndset);
// Tạo cho thời gian chạy
function startTimer() {
  var TIME_LIMIT = 30;
  var TIME_PASSED = 0;
  var TIME_LEFT = TIME_LIMIT;
  var randomTime = setInterval(randomColor, 1000);
  timerInterval = setInterval(() => {
    TIME_PASSED = TIME_PASSED + 1;
    TIME_LEFT = TIME_LIMIT - TIME_PASSED;
    if (TIME_LEFT < 10) {
      document.querySelector(".second").innerHTML = "0" + TIME_LEFT;
      document.querySelector(".audio-10s").classList.add("audio-start");
    } else {
      document.querySelector(".second").innerHTML = TIME_LEFT;
    }
    if (TIME_LEFT === 0) {
      document.querySelector(".audio-bell-rang").autoplay = true;
      document.querySelector(".audio-bell-rang").load();
      clearInterval(timerInterval);
      clearInterval(randomTime);
      document.querySelector(".btn-start").disabled = false;
      document.getElementById("bounce-element").style.pointerEvents = "none";
      Swal.fire("Hết giờ", "Số điểm của bạn là " + diem, "success");
      return TIME_LEFT;
    }
    var count = true;
    if (document.querySelector(".audio-start") !== null && count === true) {
      document.querySelector(".audio-10s").autoplay = true;
      document.querySelector(".audio-10s").load();
    }
  }, 1000);
}
const btnStart = document.querySelector(".btn-start");
btnStart.addEventListener("click", () => {
  game();
  document.querySelector(".audio-begin").autoplay = true;
  document.querySelector(".btn-start").disabled = true;
  document.querySelector(".audio-begin").load();
  startTimer();
  diem = 0;
  document.getElementById("point").innerHTML = diem;
  document.getElementById("bounce-element").style.pointerEvents = "auto";
});

var colorText = document.querySelector(".color");
const listColor = ["Blue", "Red", "Green", "Black"];
function randomColor() {
  return Math.floor(Math.random() * listColor.length);
}
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function game() {
  var tc = listColor[randomColor()];
  colorText.style.color = listColor[randomColor()];
  colorText.innerHTML = tc;
  var arrayColor = listColor;
  shuffle(arrayColor);
  var span = document.createElement("span");
  document.getElementById("bounce-element").innerHTML = "";
  for (let i = 0; i < arrayColor.length; i++) {
    if (arrayColor[i] == tc) {
      kq = i;
    }
    span.style.backgroundColor = arrayColor[i];
    document.getElementById("bounce-element").appendChild(span.cloneNode());
  }

  var spanKQ = document.querySelectorAll("#bounce-element span");
  for (let index = 0; index < spanKQ.length; index++) {
    spanKQ[index].addEventListener("click", function () {
      if (index == kq) {
        console.log("đúng");
        diem += 2;
        document.getElementById("point").innerHTML = diem;
        game();
      } else {
        if (diem != 0) diem -= 1;
        document.getElementById("point").innerHTML = diem;
        game();
      }
    });
  }
}
