# MyRehab

웹앱과 자체 개발 보조도구를 사용해 자가 재활 운동의 어려움을 해결하여 부족한 재활 시설 인프라 환경에 기여

<br>

# 프로젝트 개요

> 뇌, 척수 등 중추신경계의 질환과 손상의 경우 수술이나 처치 후 최대 1년까지를 회복 시기로 보고 이 시기에 집중 재활을 꾸준히 해야만 손상 이전 기능의 80~90% 수준까지 회복할 수 있다. 결과적으로 이 회복 시기의 재활치료가 삶의 질과 진료비 지출 감소에 큰 영향을 미치는 것이다.
>
> 문제는 집중 재활을 할 수 있는 여건이다. 현재 병원에서의 장기 입원은 여러 가지로 제약이 많다. 급성기 치료 중심으로 병원 체계가 이루어져 있어서 상태가 안정된 재활환자는 장기간 같은 병원에서의 입원 치료가 어려워 주기적으로 병원을 옮기거나 장기 입원이 가능한 요양병원으로 옮겨 치료를 받고 있다. 학계, 전문가, 의료계에서는 이러한 상황을 들어 현행 재활 의료 전달 체계상 회복기 인프라가 부족 상황을 심각한 문제로 삼고 있다.

<br>

**재활 인프라 부족현상**을 해결하기 위해서는 치료센터를 늘리는 방법이 있지만 이는 수많은 비용을 필요로 하기 때문에 비효율적이며 현실적이지 못하다. 

<br>

미국 듀크대학교의 재활 치료에 관한 연구에 따르면 재활효과는 재활 치료에서 장소가 중요한 것이 아닌, 어디에서 하든지 체계적이고 철저한 계획에 따라 치료를 진행하면 같은 효과를 얻을 수 있다는 결과를 확인할 수 있다.

<br>

이에 우리팀은 체계적이고 계획적으로 자가 재활 운동을 보조해줄 수 있도록 **MyRehab(마이리햅)** 을 제작했다. MyRehab은 **장력 조절 스트레칭 밴드**와 **스마트 운동매트** 그리고 이들과 연동된 **웹앱**으로 구성되어 있다. 

<br>

 **장력 조절 스트레칭 밴드**는 firebaseDB로부터 사용자의 수행 기록을 받고 그에 따라 밴드의 장력을 조절하여 감각 강화 효과를 높인다. 또한 자이로센서를 통해 사용자의 재활 운동 자세를 교정한다.
 
 **스마트 운동매트**는 현재 수행하는 운동요법의 동작 수행을 도와주기 위한 LED를 점등하고 압력센서로 사용자의 균형을 측정하여 자세를 교정한다.
 
 **웹앱**은 미리 학습한 재활 운동 자세 모델을 Javascript로 불러와 카메라를 통해 사용자의 자세를 분석해 피드백을 제공하고 감각 강화를 위해 점진적 과부하를 고려한 재활 일정을 관리해준다. 또한 꾸준한 관리를 유도하기 위해 게임으로 진행하는 간단한 재활 운동도 제공한다.
 
 <br>
 
 # 개발 목표
 
**1. 올바른 요법으로 시행**<br>
올바르지 못한 방법과 동작으로 재활치료를 진행하면 높은 효과를 얻지 못할 뿐만 아니라 또 다른 부상을 초래할 가능성을 유발한다. 이를 방지하기 위해 스마트 운동매트의 FSR402와 스트레칭 밴드의 MPU6050을 통해 균형을 바로 잡고 웹캠을 통해 학습된 모델을 기반으로 사용자의 자세를 분석하고 교정을 한다. 

**2. 점진적 과부하**<br>
재활치료는 근육과 관절의 감각을 강화하기 위해 운동 강도와 범위를 점진적으로 증가시킨다. 리를 측정하고 그에 맞는 범위 및 강도를 올바르게 설정하여 실행해야 한다. 웹앱은 사용자가 수행한 기록을 기반으로 스케줄을 관리하고 이에 따라 스트레칭 밴드의 장력을 조절하여 감각 강화를 유도한다.

**3. 꾸준한 관리**<br>
전문가들에 따르면 재활치료의 성패는 꾸준함이라고 해도 과언이 아니라고 한다. 중추신경계 손상 치료 후 재활치료를 가지는 경우 최대 1년까지 회복 시기로 보기 때문에 그동안 반복적인 재활치료를 꾸준히 이어나갈 수 있어야 한다. MyRehab은 간단한 재활 운동과 함께 진행할 수 있는 게임을 웹앱을 통해 제공하여 지루할 수 있는 재활치료에 재미와 흥미가 가질 수 있도록 도와줄 것이다.

<br>

# 진행과정

## 깃허브
깃허브에 저장소를 생성하여 먼저 웹을 만든다. 커밋은 git 커밋 컨벤션을 지켜 작성하도록 주의한다.

커밋 컨벤션은 [이 블로그](https://velog.io/@djh20/Git-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)를 참고해서 작성한다.

<br>

## 웹

### index 페이지 

사이트에 접속하면 가장 먼저 보는 페이지로 MyRehab에 대한 설명과 이용가이드의 설명을 포함한다.


#### 폰트변경

부트스트랩 CDN을 사용하여 nav-bar를 생성했고 그 안의 홈버튼과 메뉴 글씨를 변경하기 위해 [눈누](https://noonnu.cc/)에서 폰트를 받아 사용했다.

index.html에 main.css를 불러오고 폰트를 css에 추가했지만 적용이 되지 않았다. 부트스트랩에 설정된 css가 nav-bar에 우선순위가 높아서 적용이 안되었다고 생각해서 index.html의 head 태그에 직접 폰트를 불러와서 적용하려는 a태그에 인라인으로 작성했더니 잘 적용이 되었다.