# MyRehab WEB

<br>

## ๐ฆพ ๊ธฐ๋ฅ

  - ๋ถ์์ ๋์ด๋ ์ค์  
    - ๋ถ์์ ๋์ด๋๋ฅผ ์ ํํ๋ฉด ์ ํ์ ๋ณด๋ฅผ ์๋ฒ์ POST๋ฐฉ์์ผ๋ก ์ ์ก. 
    - ์๋ฒ์์๋ ์ ์ก๋ฐ์ ๋ถ์์ ๋์ด๋๋ฅผ ์ด๋ฆ์ผ๋ก ๊ฐ๋ ๋จธ์ ๋ฌ๋ ๋ชจ๋ธ์ ๋ถ๋ฌ์์ ์ฌํ์น๋ฃ ํ์ด์ง์ ์ ์ฉ.
  - ๋งคํธ ์๋ ฅ ์๊ฐํ 
    - ์ฌํ์น๋ฃ๋ฅผ ์งํ ์ค์ธ ์ฌ์ฉ์๊ฐ ์ค๋งํธ๋งคํธ์ ๊ฐํ๋ ์๋ ฅ์ ์ธก์ ํ์ฌ ๋งคํธ์ ์ด๋ ์์น์ ์๋ ฅ์ด ๊ฐํด์ง๊ณ  ์๋์ง ํ์ด์ง์ css๋ฅผ javascript๋ก ๋ณ๊ฒฝํด์ ๋งคํธ์ ์ํ๋ฅผ ์๊ฐํํด ๋ณด์ฌ์ค.
  - ์์ธ ๊ต์  
    - ์น์บ ์ผ๋ก ์ฌ์ฉ์ ๋์ ์ํ ์ด๋ฏธ์ง๋ฅผ ์๋ ฅ๋ฐ์์ ์์ธ๋ฅผ ๋ถ์
    - ์ปจํธ๋กค๋ฌ์ ์ผ์๊ฐ๊ณผ ์ค๋งํธ๋งคํธ ์ผ์๊ฐ์ firebaseDB์์ ์ฝ์ด๋ค์ธ ํ, ํ์ฌ์ ์น๋ฃ ๋์์ ๋ถํฉํ๋ ๊ฐ์ธ์ง ๋น๊ต
    - ์์ธ์ ๊ต์ ์ด ํ์ํ ๊ฒฝ์ฐ ์์ฑ ํผ๋๋ฐฑ ์ ๊ณต
  - ๊ธฐ๋ก๊ด๋ฆฌ
    - ์ฌ์ฉ์ ๊ธฐ๋ก์ sqlite3 DB์ ์ถ๊ฐ
  - ์ปค๋ฎค๋ํฐ 
    - MyRehab ์ฌ์ฉ์๋ค๊ณผ ์ฌํ์ ๋ฌธ๊ฐ๋ค์ด ์ฌํ์น๋ฃ์ ๊ดํ ์ ๋ณด๋ฅผ ๊ณต์ ํ  ์ ์๋๋ก ์ง๋ฌธ๊ณผ ๋ต๋ณ์ form์ผ๋ก ์ ์ก๋ฐ์ sqlite3 DB์ updateํ์ฌ ์ปค๋ฎค๋ํฐ๋ฅผ ํ์ฑํ๋ค.
  - ๊ฒ์ 
    - firebaseDB์ โcontroller/โ ๋ฌธ์์ ๋ฑ๋ก๋ ๋ฌธ์์ด ๋ฐ์ดํฐ๋ฅผ READ
    - JSON.parse ํจ์๋ฅผ ์ฌ์ฉํด์ ๋ฐฐ์ด๋ก ๋ณ๊ฒฝํ ๋ค ๊ฒ์์ ํ์ํ ๋ฐ์ดํฐ๊ฐ ํฌํจ๋ ์ธ๋ฑ์ค์ ๊ฐ์ ์ฐธ์กฐ
    - ๊ธฐ์ธ๊ธฐ๋ฅผ ์ฌ์ฉํ ์์ด๋ก ๊ฒ์์ด๋ ์๋ ฅ์ ์ฌ์ฉํ๋ ๋ฆฌ๋ฌ ๊ฒ์์ ์ ์ฉ 

<br>

## ๐ข DB ๊ตฌ์กฐ๋
![๋ฐ์ดํฐ๋ฒ ์ด์ค](./readmeImg/myrehab_sqlite.png)

<br>

## ๐ API ์คํ

+ ```POST /manage/``` : ์ฌํ์น๋ฃ๊ฐ ์๋ฃ๋์  ์ฌ์ฉ์ID, ๋ถ์, ๋์ด๋, DateTime์ ๋ฐ์์ DB์ ์ ์ฅ
+ ```GET /rehab/``` : ์น๋ฃ ํ์ด์ง์์ ์ฌ์ฉ๋  ๋ชจ๋ธ์ ์ด๋ฆ์ ํด๋นํ๋ ๋ถ์์ ๋์ด๋๋ฅผ ๋ฐ์์ html์ Json ์ ๋ฌ
+ ```GET /board/``` : ์ง๋ฌธ ๋ฆฌ์คํธ ์กฐํ API
+ ```GET /board/<int:question_id>/``` : ์ง๋ฌธ์ ์ ๋ชฉ, ๋ด์ฉ, ๋ต๋ณ ์กฐํ API
+ ```POST /board/question/create/``` : ์ง๋ฌธ ๋ฑ๋ก API
+ ```POST /board/answer/create/<int:question_id>/``` : ๋ต๋ณ ๋ฑ๋ก API

