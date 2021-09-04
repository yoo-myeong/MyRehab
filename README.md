# MyRehab

### 👉 목적

웹과 자체 개발 보조도구를 사용해 자가 재활 운동의 어려움을 해결하여 부족한 재활 시설 인프라 환경에 기여

<br>

### 🔎 프로젝트 개요

 우리 팀은 자가 재활치료를 보조하고 꾸준한 상지 재활을 도와줄 **MyRehab(마이리햅)** 을 제작했다. MyRehab은 [스마트 운동매트]()와 [컨트롤러]() 그리고 이들과 연동되는 [웹]()으로 구성되어 있다. 
 
**스마트 운동매트**는 재활치료 동작 수행을 도와주기 위해 LED를 점등하여 다음 스텝을 안내하고, 각 지점에 부착된 압력센서로 사용자의 균형을 측정하여 자세를 교정한다.
 
**컨트롤러**는 MPU6050을 부착해 roll, pitch, yaw를 측정해서 자세 교정과 손목 재활 게임에 활용하며 사용자가 버튼을 누르는 힘을 압력센서로 측정해서 손가락 재활 게임에 사용한다.
 
**웹**은 재활치료 동작을 머신러닝한 모델을 Javascript로 불러온 뒤, 웹캠으로 입력되는 사용자의 자세를 분석해서 자세의 정확성을 판단한다. 그래프와 캘린더를 활용한 스케줄링이 가능하며 지루해하기 쉽고 가볍게 여길 수 있는 상지 재활치료를 꾸준히 수행하도록 유도하기 위해서 컨트롤러를 활용한 재활 게임을 제공한다. 마지막으로 커뮤니티를 통해 사용자 간 재활에 관한 정보공유가 가능하다.
 
<br>

### 📹 시연영상

*클릭하면 유튜브로 이동*

[![MyRehab_시연영상](http://img.youtube.com/vi/qF2fW21TfUo/0.jpg)](https://youtu.be/qF2fW21TfUo?t=0s) 

<br>

### 🔨 트러블슈팅
#### 💻 웹

+ **Django 프로젝트 생성**

   ```rehab앱```을 생성하고 ```rehab.model```을 만들었다. ```templates``` 생성 후 경로를 설정하고 프론트엔드의 html파일을 이동시켰다. **MTV패턴**으로 시스템 구조를 디자인하기 위해서 ```views.py```와 ```urls.py```에 기본적인 셋팅을 했다. 

    > ```nav-bar```와 ```<head>```에서 가져오는 **정적파일**, **폰트** 등은 공통적으로 사용되기 때문에 코드를 더 클린하게 구성하기 위하여 ```base.html```을 생성하고 **템플릿 상속**을 시켰다. 
   >
   > 그런데 정적 파일을 관리하는 ```static```이 로드되지 않는 문제가 발생했다. ```base.html```에 ```{% load static %}```을 작성해놨지만 이는 파생되는 템플릿에 까지 영향을 주는 것이 아니기 때문에 정적파일을 사용하는 html 파일에도 따로 static을 로드 해주어서 문제를 해결했다.

