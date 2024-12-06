# Running The Sensationalist Project

## General Prerequisites
To run this project, ensure you have the following installed:
1. Node.js (version 12 or higher)
2. Git

---

## Steps to Run the Project

### 1. Back-End Setup
Navigate to the backend folder:
    cd TheSensationalist.XYZ/sensationalistbackend

Download dependcies:
    npm install

Start backend:
    node index.js


The backend server will run on `http://localhost:5000`.

---------------------------------------------------------------

### 2. Front-End Setup

Navigate to the frontend folder:
    cd TheSensationalist.XYZ/sensationalistfrontend

Install dependencies:
    npm install

Start the frontend server:
    npm start

The frontend server will run on `http://localhost:3000`.

---
------------------------------------------------------------------

IF YOU HAVE ISSUES PLEASE REINSTALL dependencies

# Step 1: Delete the node_modules folder
rm -rf node_modules

Step 2: Delete the package-lock.json file
rm package-lock.json

Step 3: Clear npm cache
npm cache clean --force

Step 4: Reinstall all dependencies
npm install

That's it! Enjoy running **The Sensationalist**!
