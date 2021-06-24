# 練習作：「使用passport middleware實作登入系統」

## 流程筆記
https://tzynwang.github.io/2021/express-passport-login-note/

## 功能
- 搭配mongoDB儲存使用者資料
- 可進行使用者註冊與登入功能
- 未登入之使用者無法瀏覽/dashboard頁面
- 已登入之使用者無法瀏覽/user/login或/user/register頁面

## 環境需求
- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

## 開啟方式
除第5步以外皆在終端機執行
1. `git clone https://github.com/tzynwang/Practice_express-passport-login.git`
1. `cd Practice_express-passport-login`
1. `npm install`
1. `npm run dev`
1. 使用瀏覽器連線至`localhost:5000`
1. `Ctrl/Command + C`結束專案