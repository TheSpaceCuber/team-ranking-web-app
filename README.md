# Team Ranking Web Application

## Local Setup
Ensure you have [NodeJS](https://nodejs.org/en/) installed.

To start the backend:
```
cd backend/

# install dependencies
npm install

# start backend service
node index.js

# Alternatively, if you have nodemon installed
nodemon index.js
```

To start the frontend:
```
cd frontend/

# install dependencies
npm install

# To connect to local backend (Bash - MacOS/Linux)
REACT_APP_ENV=DEV npm start

# To connect to cloud backend (public)
npm start
```

If you're on windows and want to connect to local backend:
```
# CMD
set "REACT_APP_ENV=DEV" && npm start

# Powershell
($env:REACT_APP_ENV = "DEV") -and (npm start)
```

## Tech Stack:
1. Deployment: Digital Ocean (Backend) and Github Pages (Frontend)
2. Database: MongoDB Atlas
3. Frameworks: ReactJS, ExpressJS
4. Server: NodeJS

## How it Works
The application takes in user input for team information and match results in a certain specific format.
![image](https://user-images.githubusercontent.com/43946966/189531046-f27ef2a7-479d-4fb3-893e-ad9735ec4685.png)

This is followed by the calculation and output of ranking of teams for each round of input.
![image](https://user-images.githubusercontent.com/43946966/189531010-775b5690-e0fa-4b18-8996-72ad645bb38c.png)

If your input is invalid, the application will throw an error with information regarding the wrong input.

## Check it out
https://www.royceho.net/team-ranking-web-app/