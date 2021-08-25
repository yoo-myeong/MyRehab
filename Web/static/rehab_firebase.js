var firebaseConfig = {
    apiKey: "AIzaSyC6i4-cibiWIss4e6arom0gkyE5SCHjnpk",
    authDomain: "devcon043.firebaseapp.com",
    databaseURL: "https://devcon043-default-rtdb.firebaseio.com",
    projectId: "devcon043",
    storageBucket: "devcon043.appspot.com",
    messagingSenderId: "658895697795",
    appId: "1:658895697795:web:3ad7b1fea22130c74468b6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
function writeUserData(value) {
    firebase.database().ref('users/').set(value);
}

console.log(part)
console.log(step)

//인자를 firebase에 업로드해주는 함수
var database = firebase.database();
function writeLed0_7(value) {
    firebase.database().ref('LED/LED0_7/').set(value);
}
function writeLed8_15(value) {
    firebase.database().ref('LED/LED8_15/').set(value);
}
function writeLed16_19(value) {
    firebase.database().ref('LED/LED16_19/').set(value);
}
function writeLed20_23(value) {
    firebase.database().ref('LED/LED20_23/').set(value);
}

if(part==="shoulder"){
    writeLed0_7("00000000");
    writeLed8_15("00100010");
    writeLed16_19("0000");
    writeLed20_23("0000");
}
else if(part==="knee"){
    writeLed0_7("01000000");
    writeLed8_15("00000010");
    writeLed16_19("0000");
    writeLed20_23("0000");
}
else if(part==="backbone"){
    writeLed0_7("00000110");
    writeLed8_15("01100000");
    writeLed16_19("1001");
    writeLed20_23("0000");
}

//리스너로 이벤트 발생 시 값 수신
var Press0_11 = firebase.database().ref('PRESS/PRESS0_11');
  Press0_11.on('value', (snapshot) => {
  console.log("snapshot.val() is" , snapshot.val());
  const data = snapshot.val();
  const parsedlist = JSON.parse(data);
  console.log("parsedlist is" ,parsedlist);
  var step;
  for(step = 0; step<12; step++){
        let dot = document.getElementById(`dot${step}`)
        console.dir(dot)
        if(parsedlist[step] >= 120){
            dot.style.backgroundColor = "orangered"
        }
        else{
            dot.style.backgroundColor = "white"
        }
  }
});

var Press12_23 = firebase.database().ref('PRESS/PRESS12_23');
  Press12_23.on('value', (snapshot) => {
  console.log("snapshot.val() is" , snapshot.val());
  const data = snapshot.val();
  const parsedlist = JSON.parse(data);
  console.log("parsedlist is" ,parsedlist);
  var step;
  for(step = 0; step<12; step++){
        let dot = document.getElementById(`dot${step+12}`)
        console.log(dot)
        if(parsedlist[step] >= 120){
            dot.style.backgroundColor = "orangered"
        }
        else{
            dot.style.backgroundColor = "white"
        }
  }
});