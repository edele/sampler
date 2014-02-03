var snd = {
  'click': new Audio('mp3/click.mp3'),
  'bass': new Audio('mp3/bass.mp3'),
  'hat' : new Audio('mp3/hat.mp3'),
  'crash' : new Audio('mp3/crash.mp3'),
  'snare' : new Audio('mp3/snare.mp3'),
  'kick' : new Audio('mp3/kick.mp3'),
};

// PlaySound
function play (id) {
  snd[id].currentTime = 0;
  snd[id].play();
  colorKick(document.getElementById(id));
}

function barIndicator(bars) {
  var out = "";
  for (var i = 0; i<16; i++) {
    if (i<bars) {
      out += "#";
    } else {
      out += "-";
    }
    
    //if (i%4==3) {out+=" "};
  };
  return out;
}


function colorKick(elem) {
  var color = 255; // начальное значение
  elem.style.color = "rgb(255,20,20)";
  function frame() { // функция для отрисовки
    color -= 4;
    elem.style.color = "rgb("+color+",0,0)";
    if (color <= 20) { 
      clearInterval(timer); // завершить анимацию
      elem.style.color = "rgb(20,20,20)";
    }
  }
  var timer = setInterval(frame, 10) // рисовать каждые 10мс
}
var loopEnabled = false;

function loopCheckbox (checkbox) {
  if (checkbox.checked) {
    loopEnabled = true;
  } else {
    loopEnabled = false;
  }
}
var timerSounds;
var timerSoundsAr;
var loop = new function() {
  var ms = 0;
  var bars = 0;
  var timerBar = document.getElementById("timerBar");
  timerSoundsEl = document.getElementById("timerSounds");
  timerSounds = timerSoundsEl.value;
  timerSoundsAr = timerSounds.split("\n");
  function sample () {
    if (!loopEnabled) return;
    ms++;
    if (ms >= 30){
      ms = 0;
      if (bars > 16) {
        bars = 1;
      }
      if (bars % 4 == 1) {
        colorKick(timerBar);
      };
      for (var i = timerSoundsAr.length - 1; i >= 0; i--) {
        if (timerSoundsAr[i][bars-1] != "-") {
          switch(timerSoundsAr[i][bars-1]) {
            case "b": // B
            play('bass')
            break;
            case "c": // C
            play('click')
            break;
            case "h": // H
            play('hat')
            break;
            case "u": // U
            play('crash')
            break;
            case "s": // S
            play('snare')
            break;
            case "v": // V
            play('kick')
            break;
          }
        }
      };
      timerBar.innerHTML = barIndicator(bars) + "\t" + bars;
      bars++;
    }
  }
  var timer = setInterval(sample, 1); // one 100th sample
  this.reset = function() {
    this;
  }
};

document.onkeydown = function psk(e) {
  //console.log(e);
  switch(e.keyCode) {
    case 66: // B
    play('bass')
    break;
    case 67: // C
    play('click')
    break;
    case 72: // H
    play('hat')
    break;
    case 85: // U
    play('crash')
    break;
    case 83: // S
    play('snare')
    break;
    case 86: // V
    play('kick')
    break;
  }
};

function changeMe (me) {
  var r = prompt("change the groove" ,me.innerHTML);
  if (r) {
    me.innerHTML = r;
  }
}

loop;