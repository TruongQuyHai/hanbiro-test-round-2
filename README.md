# Hanbiro Test

## Attention

Please read two other README.md files in each directories

## Steps to rebuild this project

### 1. Server-side:
- Having node installed
- Having a running postgresql server on the local machine
- Create a .env file in the root of hanbiro-server directory with the following variables (which are needed to run the project):
  - NODE_ENV=development
  - PORT=8080
  - POSTGRES_USER: your postgres server user
  - POSTGRES_PASSWORD: your postgres server password
  - POSTGRES_HOST: your postgres server host
  - POSTGRES_PORT: your postgres server port
  - POSTGRES_DB: your postgres server database to use
- npm install
- npm start
### 2. Client-side:
  - npm install
  - npm start

## Sidenote
- Originally, I wanted to set up a React app with typescript, react-router-dom, redux-toolkit, react-query, mui but I dropped typescript and redux-toolkit.
- And I also wanted to setup backend with Docker but I dropped it too due to time constraint.

## Lastly, thank you for reading this README.md file.