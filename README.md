# My Wallet api

An api for tracking expenses and revenues.

## About

This is an api designed to handle all your requests related to keep a track of expenses and revenues.

Some of the features already implemented are:

- Sign Up and Login 
- List all financial events
- Add expenses and revenues 


## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
</p>

## How to run

1. Clone this repository
2. Clone the front-end repository at https://github.com/gabriel-lutz/my-wallet
3. Follow instructions to run front-end at https://github.com/gabriel-lutz/my-wallet
4. <p>
    <details>
      <summary>Run the database file located at **./database**</summary>

      1. Create a postgres database called "mywallet"
      
      2. In your /database folder, run the sql script file with
      
        psql -d mywallet -f database.sql
    </details>
  </p>

5. Install dependencies
```bash
npm i
```
6. Run the back-end with
```bash
npx nodemon ./src/server.js
```
7. Finally access your front-end page on your favorite browser (unless it is Internet Explorer. In this case, review your life decisions)