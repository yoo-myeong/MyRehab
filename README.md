# MyRehab

## ๐ ๋ชฉ์ 

**์น**, **์ค๋งํธ๋งคํธ**, **์ปจํธ๋กค๋ฌ**๋ฅผ ์ฌ์ฉํด ์๊ฐ ์ฌํ ์น๋ฃ๋ฅผ ๋ณด์กฐํ์ฌ ๋ถ์กฑํ ์ฌํ ์์ค ์ธํ๋ผ ํ๊ฒฝ์ ๊ธฐ์ฌ

<br>

## ๐ ํ๋ก์ ํธ ๊ฐ์

 
### ๊ตฌ์ฑ
+ Web
  + ์น์บ ์ผ๋ก ์๋ ฅ๋๋ ์ฌ์ฉ์์ ์์ธ๋ฅผ ๋จธ์ ๋ฌ๋ํ ๋ชจ๋ธ์ ๊ธฐ๋ฐ์ผ๋ก ๋ถ์ํ์ฌ ์์ธ์ ์ ํ์ฑ์ ํ๋จ 
  + ์ฌํ ๊ฒ์ ์ ๊ณต 
  + ์ปค๋ฎค๋ํฐ๋ฅผ ํตํด ์ฌ์ฉ์ ๊ฐ ์ฌํ์ ๊ดํ ์ ๋ณด๋ฅผ ๊ณต์ 
+ ์ค๋งํธ๋งคํธ
  + ๋งคํธ์ LED๋ฅผ ์ ๋ฑํ์ฌ ๋ค์ ๋์์ ์๋ดํ๊ณ , ๊ฐ ์ง์ ์ ๋ถ์ฐฉ๋ ์๋ ฅ์ผ์๋ก ์ฌ์ฉ์์ ๊ท ํ์ ์ธก์ ํ์ฌ ์์ธ๋ฅผ ๊ต์ 
+ ์ปจํธ๋กค๋ฌ 
  + MPU6050์ ๋ถ์ฐฉํด roll, pitch, yaw๋ฅผ ์ธก์ ํด์ ์์ธ ๊ต์ ๊ณผ ์๋ชฉ ์ฌํ ๊ฒ์์ ํ์ฉ 
  + ์ฌ์ฉ์๊ฐ ๋ฒํผ์ ๋๋ฅด๋ ํ์ ์๋ ฅ์ผ์๋ก ์ธก์ ํด์ ์๊ฐ๋ฝ ์ฌํ ๊ฒ์์ ํ์ฉ

 
<br>

## ๐น ์์ฐ์์

ํด๋ฆญํ๋ฉด ์ ํ๋ธ๋ก ์ด๋ โฌ

[![MyRehab_์์ฐ์์](http://img.youtube.com/vi/qF2fW21TfUo/0.jpg)](https://youtu.be/qF2fW21TfUo?t=0s) 

<br>

## ๐ง ์์ธํ ๊ฐ๋ฐ ๋ด์ฉ

[Web](./web.md)

[SmartMat](./smartmat.md)

[Controller](./controller.md)

<br>

## ๐จ ๋ฌธ์ ํด๊ฒฐ

+ **firebase update ์๋ ๊ฐ์ **

   IoT ์ ํ๊ณผ ์น์ ๊ณต์ ํด์ผ ํ๋ ๋ฐ์ดํฐ๋ฅผ firebase realtime DB์ ์๋ฐ์ดํธํ์ต๋๋ค. ๋ชจ๋  ๋ฐ์ดํฐ๊ฐ ํค๋ฅผ ๊ฐ๊ณ  ์๋ฐ์ดํธ๋๋๋ผ๋ ์ถฉ๋ถํ ๋น ๋ฅธ ์๋๋ก ๋์ํ  ๊ฒ์ด๋ผ๊ณ  ์์ํ์ต๋๋ค. IoT ์ ํ์ ์๋์ด๋ธ๋ก ์ ์ํ๋๋ฐ esp8266 ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํด์ firebaseDB์ ์๋ฐ์ดํธ์์ผฐ์ต๋๋ค. ์ด ์๋ฐ์ดํธ๋ ํ ๋ฒ ๋์ํ  ๋๋ง๋ค ์ฝ 1์ด๊ฐ ๊ฑธ๋ ธ๊ณ , ๋ชจ๋  ๋ฐ์ดํฐ๊ฐ ์๋ฐ์ดํธ๋ฅผ ์๋ฃํ๋ ค๋ฉด ์ด 20์ด๊ฐ ์์๋์ต๋๋ค. <br>
 ์ค์ฌ์ฉ์ด ๊ฐ๋ฅํ ์ ํ์ ๊ฐ๋ฐํ๊ธฐ ์ํด์๋ 20์ด์ ์๊ฐ์ ์ต์ํ 1์ด๊น์ง ๋จ์ถํด์ผ ํ์ต๋๋ค. ํ์๋ค๊ณผ ์ฌ๋ฌ ๊ฐ์ง ๋ฐฉ๋ฒ์ ๋ชจ์ํ๊ณ  ์๊ฒฌ์ ๋๋ ๋ค javascript์ json.parse()๋ฅผ ์ฌ์ฉํด์ ๋ฌธ์์ด์ ํ์ฑํ๋ ๋ฐฉ๋ฒ์ด ๊ฐ์ฅ ์ ํฉํ๋ค๊ณ  ํ๋จํ์ต๋๋ค. ์๋ฅผ ๋ค์ด ์๋ ฅ ๋ฐ์ดํฐ์ ๊ฒฝ์ฐ 24๊ฐ์ ๊ฐ์ โ[200, 123, 50, 0, 0, โฆ]โ๊ณผ ๊ฐ์ ๋ฌธ์์ด๋ก ๋ง๋ค์ด์ โPRESSโ ํค์ ์๋ฐ์ดํธํฉ๋๋ค. ์น์์๋ โPRESSโ ํค์ ๋ฌธ์์ด์ ๊ฐ์ ธ์จ ๋ค ํ์ฑํด์ ๋ฐฐ์ด๋ก ๋ณํํ๊ณ  2์ฐจ ์์ธ ๋ถ์์ ํ์ฉํฉ๋๋ค. ๋ชจ๋  ์๋ฐ์ดํธ ๋์์ ์ด ๋ฐฉ๋ฒ์ ์ ์ฉํ๊ณ  ์ฝ 1์ด๋ง๋ค ์ฌ์ฉ์์ ์์ธ๋ฅผ ๋ถ์ํ๋ ์ ํ์ ์์ฑํ  ์ ์์์ต๋๋ค.
