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

//파트별 firebase 업로드 함수
function FirebaseLEDSetByPart(data){
    if(data === "shoulderup"){ // 10번,14번 스텝핑
        writeLed0_7("00000000");
        writeLed8_15("00100010");
        writeLed16_19("0000");
        writeLed20_23("0000");
    }
    else if(data === "shoulderdown"){ // 10번,14번 스텝핑
        writeLed0_7("00000000");
        writeLed8_15("00100010");
        writeLed16_19("0000");
        writeLed20_23("0000");
    }
    else if(data === "kneeup"){ // 1번,14번 스텝핑
        writeLed0_7("01000000");
        writeLed8_15("00000010");
        writeLed16_19("0000");
        writeLed20_23("0000");
    }
    else if(data === "kneedown"){ //13번,14번 스텝핑
        writeLed0_7("0000000");
        writeLed8_15("00000110");
        writeLed16_19("0000");
        writeLed20_23("0000");
    }
    else if(data === "backboneup"){
        writeLed0_7("00000110");
        writeLed8_15("01100000");
        writeLed16_19("0110");
        writeLed20_23("0000");
    }
    else if(data === "backbonedown"){
        writeLed0_7("00000110");
        writeLed8_15("01100000");
        writeLed16_19("0010");
        writeLed20_23("0000");
    }
}

if(part==="shoulder"){
    FirebaseLEDSetByPart("shoulderup")
}
else if(part==="knee"){
    FirebaseLEDSetByPart("kneeup")
}
else if(part==="backbone"){
    FirebaseLEDSetByPart("backboneup")
}

//리스너로 이벤트 발생 시 값 수신해서 mat css 색깔 on
var Press0_11 = firebase.database().ref('PRESS/PRESS0_11');
  Press0_11.on('value', (snapshot) => {
  const data = snapshot.val();
  const parsedlist = JSON.parse(data);
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
  const data = snapshot.val();
  const parsedlist = JSON.parse(data);
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