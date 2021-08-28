var isHolding = {
  z: false,
  x: false,
  c: false,
  v: false,
  b: false,
};

var song = {
  duration: 64,
  sheet: [z, x, c, v, b]
};


var hits = { perfect: 0, good: 0, bad: 0, miss: 0 };
var multiplier = {
  perfect: 1,
  good: 0.8,
  bad: 0.5,
  miss: 0
};
var isPlaying = false;
var song_num = 1;
var speed = 1.3;
var combo = 0;
var maxCombo = 0;
var score = 0;
var animation = 'moveDown';
var startTime;
var trackContainer;
var tracks;
var keypress;
var comboText;
var hand = 0;
var limitpress =10;
var visited = false;

var initializeNotes = function () {
  var noteElement;
  var trackElement;

  while (trackContainer.hasChildNodes()) {
    trackContainer.removeChild(trackContainer.lastChild);
  }

  song.sheet.forEach(function (key, index) {
    trackElement = document.createElement('div');
    trackElement.classList.add('track');

    if (song_num === 1) {
      key.notes.forEach(function (note) {
        noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.classList.add('note--' + index);
        noteElement.style.backgroundColor = key.color;
        noteElement.style.animationName = animation;
        noteElement.style.animationTimingFunction = 'linear';
        noteElement.style.animationDuration = note.duration - speed + 's';
        noteElement.style.animationDelay = note.delay + speed + 's';
        noteElement.style.animationPlayState = 'paused';
        trackElement.appendChild(noteElement);
      });
    }

    else if (song_num === 2) {
      key.note2s.forEach(function (note) {
        noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.classList.add('note--' + index);
        noteElement.style.backgroundColor = key.color;
        noteElement.style.animationName = animation;
        noteElement.style.animationTimingFunction = 'linear';
        noteElement.style.animationDuration = note.duration - speed + 's';
        noteElement.style.animationDelay = note.delay + speed + 's';
        noteElement.style.animationPlayState = 'paused';
        trackElement.appendChild(noteElement);
      });
    }

    else if (song_num === 3) {
      key.note3s.forEach(function (note) {
        noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.classList.add('note--' + index);
        noteElement.style.backgroundColor = key.color;
        noteElement.style.animationName = animation;
        noteElement.style.animationTimingFunction = 'linear';
        noteElement.style.animationDuration = note.duration - speed + 's';
        noteElement.style.animationDelay = note.delay + speed + 's';
        noteElement.style.animationPlayState = 'paused';
        trackElement.appendChild(noteElement);
      });
    }
    trackContainer.appendChild(trackElement);
    tracks = document.querySelectorAll('.track');
  });
};

var setupSong = function () {
  var buttons = document.querySelectorAll('.btn--song');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (this.innerHTML === 'a') {
        buttons[0].className = 'btn btn--song btn--selected';
        buttons[1].className = 'btn btn--song';
        buttons[2].className = 'btn btn--song';
        song_num = 1;
        song.duration = 64;
        limitpress = 10;
        initializeNotes();
      } else if (this.innerHTML === 'b') {
        buttons[0].className = 'btn btn--song';
        buttons[1].className = 'btn btn--song btn--selected';
        buttons[2].className = 'btn btn--song';
        song_num = 2;
        song.duration = 33;
        limitpress = 20;
        initializeNotes();
      } else if (this.innerHTML === 'c') {
        buttons[0].className = 'btn btn--song';
        buttons[1].className = 'btn btn--song';
        buttons[2].className = 'btn btn--song btn--selected';
        song_num = 3;
        song.duration = 86;
        limitpress = 30;
        initializeNotes();
      }
    });
  });
};

var setupHand = function () {
  var buttons1 = document.querySelectorAll('.btn--hand');
  console.log(buttons1)
  buttons1.forEach(function (button1) {
    button1.addEventListener('click', function () {
      if (this.innerHTML === 'Left') {
        buttons1[0].className = 'btn btn--hand btn--selected';
        buttons1[1].className = 'btn btn--hand';
        hand = 0;
      } else if (this.innerHTML === 'Right') {
        buttons1[0].className = 'btn btn--hand';
        buttons1[1].className = 'btn btn--hand btn--selected';
        hand = right;
      }
    });
  });
};

var updateAnimation = function () {
  animation = 'moveDownFade';
  initializeNotes();
};

var setupStartButton = function () {
  var startButton = document.querySelector('.btn--start');
  startButton.addEventListener('click', function () {
    isPlaying = true;
    startTime = Date.now();
    startTimer(song.duration);
    document.querySelector('.menu').style.opacity = 0;
    if (song_num === 1) {
      document.querySelector('.song_1').play();
      document.querySelectorAll('.note').forEach(function (note) {
        note.style.animationPlayState = 'running';
      });

    }
    else if (song_num === 2) {
      document.querySelector('.song_2').play();
      document.querySelectorAll('.note').forEach(function (note) {
        note.style.animationPlayState = 'running';
      });

    }
    else if (song_num === 3) {
      document.querySelector('.song_3').play();
      document.querySelectorAll('.note').forEach(function (note) {
        note.style.animationPlayState = 'running';
      });

    }


  });
};

var startTimer = function (duration) {
  var display = document.querySelector('.summary__timer');

  var timer = duration;
  var minutes;
  var seconds;

  display.style.display = 'block';
  display.style.opacity = 1;

  var songDurationInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.innerHTML = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(songDurationInterval);
      showResult();
      comboText.style.transition = 'all 1s';
      comboText.style.opacity = 0;
    }
  }, 1000);
};

var showResult = function () {
  document.querySelector('.perfect__count').innerHTML = hits.perfect;
  document.querySelector('.good__count').innerHTML = hits.good;
  document.querySelector('.bad__count').innerHTML = hits.bad;
  document.querySelector('.miss__count').innerHTML = hits.miss;
  document.querySelector('.combo__count').innerHTML = maxCombo;
  document.querySelector('.score__count').innerHTML = score;
  document.querySelector('.summary__timer').style.opacity = 0;
  document.querySelector('.summary__result').style.opacity = 1;
};

var setupNoteMiss = function () {
  trackContainer.addEventListener('animationend', function (event) {
    var index = event.target.classList.item(1)[6];

    displayAccuracy('miss');
    updateHits('miss');
    updateCombo('miss');
    updateMaxCombo();
    removeNoteFromTrack(event.target.parentNode, event.target);
    updateNext(index);
  });
};

var setupKeys = function () {
  document.addEventListener('keydown', function (event) {
    var keyIndex = getKeyIndex(event.key);


    if (Object.keys(isHolding).indexOf(event.key) !== -1
      && !isHolding[event.key]) {
      isHolding[event.key] = true;
      keypress[keyIndex].style.display = 'block';
      //writeUserData(event.key);

      if (isPlaying && tracks[keyIndex].firstChild) {
        judge(keyIndex);
      }
    }
  });


  document.addEventListener('keyup', function (event) {
    if (Object.keys(isHolding).indexOf(event.key) !== -1) {
      var keyIndex = getKeyIndex(event.key);

      isHolding[event.key] = false;
      keypress[keyIndex].style.display = 'none';
    }
  });

};

var getKeyIndex = function (key) {
  if (key === 'z') {
    return 0;
  } else if (key === 'x') {
    return 1;
  } else if (key === 'c') {
    return 2;
  } else if (key === 'v') {
    return 3;
  } else if (key === 'b') {
    return 4;
  }
};

var judge = function (index) {
  var timeInSecond = (Date.now() - startTime) / 1000;
  var nextNoteIndex = song.sheet[index].next;
  if (song_num === 1) {
    var nextNote = song.sheet[index].notes[nextNoteIndex];
  }
  else if (song_num === 2) {
    var nextNote = song.sheet[index].note2s[nextNoteIndex];
  }
  else if (song_num === 3) {
    var nextNote = song.sheet[index].note3s[nextNoteIndex];
  }

  var perfectTime = nextNote.duration + nextNote.delay;
  var accuracy = Math.abs(timeInSecond - perfectTime);
  var hitJudgement;

  /**
   * As long as the note has travelled less than 3/4 of the height of
   * the track, any key press on this track will be ignored.
   */
  if (accuracy > (nextNote.duration - speed) / 4) {
    return;
  }

  hitJudgement = getHitJudgement(accuracy);
  displayAccuracy(hitJudgement);
  showHitEffect(index);
  updateHits(hitJudgement);
  updateCombo(hitJudgement);
  updateMaxCombo();
  calculateScore(hitJudgement);
  removeNoteFromTrack(tracks[index], tracks[index].firstChild);
  updateNext(index);
};

var getHitJudgement = function (accuracy) {
  if (accuracy < 0.2) {
    return 'perfect';
  } else if (accuracy < 0.4) {
    return 'good';
  } else if (accuracy < 0.6) {
    return 'bad';
  } else {
    return 'miss';
  }
};

var displayAccuracy = function (accuracy) {
  var accuracyText = document.createElement('div');
  document.querySelector('.hit__accuracy').remove();
  accuracyText.classList.add('hit__accuracy');
  accuracyText.classList.add('hit__accuracy--' + accuracy);
  accuracyText.innerHTML = accuracy;
  document.querySelector('.hit').appendChild(accuracyText);
};

var showHitEffect = function (index) {
  var key = document.querySelectorAll('.key')[index];
  var hitEffect = document.createElement('div');
  hitEffect.classList.add('key__hit');
  key.appendChild(hitEffect);
};

var updateHits = function (judgement) {
  hits[judgement]++;
};

var updateCombo = function (judgement) {
  if (judgement === 'bad' || judgement === 'miss') {
    combo = 0;
    comboText.innerHTML = '';
  } else {
    comboText.innerHTML = ++combo;
  }
};

var updateMaxCombo = function () {
  maxCombo = maxCombo > combo ? maxCombo : combo;
};

var calculateScore = function (judgement) {
  if (combo >= 80) {
    score += 1000 * multiplier[judgement] * multiplier.combo80;
  } else if (combo >= 40) {
    score += 1000 * multiplier[judgement] * multiplier.combo40;
  } else {
    score += 1000 * multiplier[judgement];
  }
};

var removeNoteFromTrack = function (parent, child) {
  parent.removeChild(child);
};

var updateNext = function (index) {
  song.sheet[index].next++;
};

window.onload = function () {
  trackContainer = document.querySelector('.track-container');
  keypress = document.querySelectorAll('.keypress');
  comboText = document.querySelector('.hit__combo');

  initializeNotes();
  setupStartButton();
  setupKeys();
  setupSong();
  setupHand();
  setupNoteMiss();
}

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyC6i4-cibiWIss4e6arom0gkyE5SCHjnpk",
  authDomain: "devcon043.firebaseapp.com",
  databaseURL: "https://devcon043-default-rtdb.firebaseio.com",
  projectId: "devcon043",
  storageBucket: "devcon043.appspot.com",
  messagingSenderId: "658895697795",
  appId: "1:658895697795:web:3ad7b1fea22130c74468b6"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
/*
function writeUserData(key) {
  if(key==="z"){
    firebase.database().ref('cur_val/').set(0);
  }
  else if(key==="x"){
    firebase.database().ref('cur_val/').set(1);
  }
  else if(key==="c"){
    firebase.database().ref('cur_val/').set(2);
  }
  else if(key==="v"){
    firebase.database().ref('cur_val/').set(3);
  }
  else if(key==="b"){
    firebase.database().ref('cur_val/').set(4);
  }
}
*/

/*
function keyidx(a,b){
  
  
}
*/

var pressRef1 = firebase.database().ref('mpu/press1/');
var pressRef2 = firebase.database().ref('mpu/press2/');
var pressRef3 = firebase.database().ref('mpu/press3/');
var pressRef4 = firebase.database().ref('mpu/press4/');
var pressRef5 = firebase.database().ref('mpu/press5/');

pressRef1.on('value', (snapshot) => {
  if (snapshot.val() >= limitpress && visited === false) {
    keypress[0].style.display = 'block';
    if (isPlaying && tracks[0].firstChild) {
      judge(0);
    }
    visited = true;
  }
  else {
    keypress[0].style.display = 'none';
    visited = false;
  }
});

pressRef2.on('value', (snapshot) => {

  if (snapshot.val() >= limitpress && visited === false) {
    keypress[1].style.display = 'block';
    if (isPlaying && tracks[1].firstChild) {
      judge(1);
    }
    visited = true;
  }
  else {
    keypress[1].style.display = 'none';
    visited = false;
  }
});

pressRef3.on('value', (snapshot) => {

  if (snapshot.val() >= limitpress && visited === false) {
    keypress[2].style.display = 'block';
    if (isPlaying && tracks[2].firstChild) {
      judge(2);
    }
    visited = true;
  }
  else {
    keypress[2].style.display = 'none';
    visited = false;
  }
});

pressRef4.on('value', (snapshot) => {

  if (snapshot.val() >= limitpress && visited === false) {
    keypress[3].style.display = 'block';
    if (isPlaying && tracks[3].firstChild) {
      judge(3);
    }
    visited = true;
  }
  else {
    keypress[3].style.display = 'none';
    visited = false;
  }
});

pressRef5.on('value', (snapshot) => {

  if (snapshot.val() >= limitpress && visited === false) {
    keypress[4].style.display = 'block';
    if (isPlaying && tracks[4].firstChild) {
      judge(4);
    }
    visited = true;
  }
  else {
    keypress[4].style.display = 'none';
    visited = false;
  }
});
