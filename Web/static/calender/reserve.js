const resvTab = document.querySelector('.resv-wrapper');
const exitBtn = document.querySelector('.resv-close');
exitBtn.addEventListener('click', ()=>{resvTab.classList.remove('open');});


// 날짜별로 이벤트 등록용 함수 및 변수
const selDate = []
const dateFunc = ()=>{
    const dates = document.querySelectorAll('.date');
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    dates.forEach((i)=>{
        i.addEventListener('click', ()=>{
            if(i.classList.contains('other') || i.classList.contains('selected')){
                dates.forEach((ig)=>{ig.classList.remove('selected');});
                i.classList.remove('selected');
                selDate.length=0;
            }else if(selDate.length > 0){
                dates.forEach((ig)=>{ig.classList.remove('selected');});
                selDate.length=0;
                i.classList.add('selected');
                selDate.push([year.innerHTML, month.innerHTML, i.innerHTML]);
                resvTab.classList.add('open');
            }else{
                i.classList.add('selected');
                selDate.push([year.innerHTML, month.innerHTML, i.innerHTML]);
                resvTab.classList.add('open');
            }
        });
    });
};

// 초기화 함수 
const reset = ()=>{
    selDate.length=0;
    dateFunc();
}

// 로드시 Nav 버튼들 이벤트 등록 및 초기화
window.onload=()=>{
    const navBtn = document.querySelectorAll('.nav-btn');
    navBtn.forEach(inf=>{
        if(inf.classList.contains('go-prev')){
            inf.addEventListener('click', ()=>{prevMonth(); reset();});
        }else if(inf.classList.contains('go-today')){
            inf.addEventListener('click', ()=>{goToday(); reset();});
        }else if(inf.classList.contains('go-next')){
            inf.addEventListener('click', ()=>{nextMonth(); reset();});
        }
    });
    reset();
}



// 그래프
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [5, 6, 7, 8, 9],
    datasets: [{
        data: [2,5,6,8,4],
        label: "무릎",
        borderColor: "#3e95cd",
        fill: false
      }, {
        data: [1,2,3,4,5],
        label: "어깨",
        borderColor: "#8e5ea2",
        fill: false
      }, {
        data: [5,1,2,3,6],
        label: "척추",
        borderColor: "#3cba9f",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: '횟수 / 월'
    }
  }
});

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["무릎", "어깨", "척추"],
      datasets: [{
        label: "부위별 수행횟수 비율",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        data: [25, 15, 17]
      }]
    },
    options: {
      title: {
        display: true,
        text: '부위별 수행횟수 비율'
      }
    }
});

new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: ["최고 난이도", "평균 점수", "하루 평균 시도횟수", "하루 평균 수행 시간"],
      datasets: [
        {
          label: "자이로게임",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [3, 6.0, 8, 3.24]
        }, {
          label: "리듬게임",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [2, 6.2, 5, 1.22]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: '재활게임 수행 기록'
      }
    }
});