██████╗ ███████╗ █████╗ ██████╗ 
██╔══██╗██╔════╝██╔══██╗██╔══██╗
██████╔╝█████╗  ███████║██║  ██║
██╔══██╗██╔══╝  ██╔══██║██║  ██║
██║  ██║███████╗██║  ██║██████╔╝
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ 
     The Grand README
------------------------------------------------

😵 The Sensationalist WEBSITE! 😵
--------------------------

🎵 A Silly Project For UGA and Henry levitt 🎵

      ;   :   ;
   .   \_,!,_/   ,
    `.,'     `.,'
     /         \
~ -- :         : -- ~
     \         /
    ,'`._   _.'`.
   '   / `!` \   `
     ;   :   ;                  
----------------
📜 **Table of Contents:** 📜
----------------
 1.   Description
 2.   Features
 3.   Technologies Used
 4.   Installation
    - Prerequisites
    - Back End Setup
    - Front End Setup
 8.   Usage
 9.   API Endpoints
 10.  Database Schema
 11.  Project Structure


---------------------------
🏄 **1. Description:** 🏄
---------------------------

The Article Management System is a full-stack web application that allows users to upload articles along with 
PDF files and view them. It features a React front end and an Express.js back end. The back end uses Sequelize
ORM with a SQLite database and handles file uploads using Multer. The front end is built with React, TypeScript,
and React Router for client-side routing.

----------------------------
🚀 **2. Features:** 🚀
----------------------------
    Article Upload: Users can upload articles with a title, description, and associated PDF file.
    Article Listing: View a list of all uploaded articles.
    Article Detail View: View detailed information about a specific article, including the option to download or view the PDF.
    File Serving: Serve uploaded PDF files for download or viewing directly in the browser.


----------------------------
🚀 **3. Technologies Used:** 🚀
----------------------------
-Back End
    Node.js: JavaScript runtime for server-side programming.
    Express.js: Web framework for Node.js.
    Sequelize ORM: Object-Relational Mapping tool for interacting with the database.
    SQLite: Lightweight relational database.
    Multer: Middleware for handling multipart/form-data, primarily used for file uploads.
    CORS: Middleware for enabling Cross-Origin Resource Sharing.
    -  Front End
    React: JavaScript library for building user interfaces.
    TypeScript: Superset of JavaScript that adds static typing.
    React Router: Library for handling routing in React applications.
    Axios: Promise-based HTTP client for the browser and Node.js.
    CSS/SCSS: Styling for the application.

----------------------------
🚀 **4. Installation:** 🚀
----------------------------
Prerequisites
    - Node.js (version 12 or higher)
    - npm or yarn
    - Git
    - Clone the Repository
        - git clone https://github.com/LincolnLedet/TheSensationalist.XYZ

BackEnd Setup
    - Clone the Repository
        - cd TheSensationalist.XYZ/sensationalistbackend
        - node index.js 
    
FrontEnd
    - cd TheSensationalist.XYZ/sensationalistfrontend
    - npm install (install dependcies)
    - npm start



----------------------------
🚀 **5. Usage:** 🚀
----------------------------

All of these require terminal commands. I use bash.



How to start BackEnd
-----------------------------------------------------------------------
Cd into TheSensationalist.XYZ/sensationalistbackend
node index.js



How to test the backend is working. 
-----------------------------------------------------------------------
http://localhost:5000/uploads/The_Sensationalist_1.pdf



How to start FrontEnd
-----------------------------------------------------------------------
Cd into TheSensationalist.XYZ/sensationalistfrontend
npm start



How to test the frontend is working. 
-----------------------------------------------------------------------
http://localhost:3000/



How to Upload a File or PDF
-------------------------------------------------------------------------------------------------------------------------------------
curl -X POST http://localhost:5000/api/articles \
  -F 'title=The Sensationalist Issue #8' \
  -F 'description=The Chain of Evolution, “Liminal Space”, On placebos, The Girl, You can’t stop me!, Alarm, The Death of Humanity, Hot Dog Art' \
  -F "pdf=@\"C:/Users/linco/Desktop/Past Issues/The_Sensationalist_8.pdf\"" \
  -F 'filetype=Article' \
  -F 'viewcount=0' \
  -F 'downloadcount=0' \
  -F 'profane=False'


