var diem = 0;
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
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function game() {
  var kq = Math.floor(Math.random() * 9);
  var span = document.createElement("span");
  var randomColor = getRandomColor();
  document.getElementById("bounce-element").innerHTML = "";
  for (let i = 0; i < 9; i++) {
    span.style.backgroundColor = randomColor;
    document.getElementById("bounce-element").appendChild(span.cloneNode());
  }

  var spanKQ = document.querySelectorAll("#bounce-element span");
  var opacityColor;
  if (diem < 40) {
    opacityColor = 0.5 + diem / 100;
  } else {
    opacityColor = 0.9;
  }
  spanKQ[kq].style.opacity = opacityColor;
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
