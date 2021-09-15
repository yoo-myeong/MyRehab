# SmartMat

## FlowChart

![smartmat_8ch](./readmeImg/smartmat_8ch.png)
![smartmat_16ch](./readmeImg/smartmat_16ch.png)

<br>

## 회로도

![smartmat_8ch](./readmeImg/smartmat_8ch_circuit.png)
![smartmat_16ch](./readmeImg/smartmat_16ch_circuit.png)

<br>

## software 기능

 24개의 압력센서를 멀티플렉서와 연결한 후 for문을 통해 각 채널에 전류를 흘려보낸 뒤 아날로그값을 수신한다. 이때 for문을 통한 채널 제어와 값 수신은 매우 빠르게 이뤄지므로 마치 24개의 압력센서 값이 동시에 측정되는 효과를 얻을 수 있다.

 수신한 값을 한꺼번에 firebase에 update하기 위해서 배열 형태의 문자열로 변환해서 update한다. 
 
 firebase에서 ‘LED/’ 문서를 읽어 상태를 변경할 LED의 인덱스를 판단한다. ‘LED/’ 문서의 데이터는 ‘0’ 또는 ‘1’로 이뤄진 문자열이기 때문에 각 인덱스의 문자에 따라서 LED를 on 또는 off 한다. 


<br>

## hardware 기능

4개의 FSR402를 제어하기 위해서 2개의 multipelexer를 사용했다. 4개의 컨트롤핀으로 16개의 output 핀에 전류를 공급하고 하나의 아날로그 값을 수신한다. 
