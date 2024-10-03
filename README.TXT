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

    ( (
     ) )
  ........
  |      |]
  \      / 
   `----'
                                     
----------------
📜 **Table of Contents:** 📜
----------------
1. 🏄 Introduction
2. 🚀 Dependencies
3. 🛠️ Usage
4. 🌈 Features
5. 🔧 Configuration
6. 📞 Contact
8. 🎉 Fun Facts


---------------------------
🏄 **1. Introduction:** 🏄
---------------------------

Welcome to **The Sensationalist Media Website**, a full-stack web application designed to serve news articles 
with a snazzy frontend and a robust backend. This project uses a React-based frontend to fetch, display, and 
interact with articles stored in a MongoDB database via a Node.js and Express backend. Users can browse articles,
view detailed content, and, with a bit of extra functionality, even add their own articles to the collection.


The project's architecture is split into two parts:
- **Backend**: Handles data storage and API interactions using Node.js, Express, and MongoDB.
- **Frontend**: Provides a sleek interface using React for smooth navigation and display of the content.

----------------------------
🚀 **2. Dependencies:** 🚀
----------------------------
### Backend (Node.js & Express)
- **Node.js**: The runtime environment that allows JavaScript to run server-side.
    It's the engine that powers the backend of this application.
- **Express**: A minimalist web framework for Node.js, used to set up the server 
    and define routes for fetching, creating, and managing articles.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB. It provides a 
    straightforward, schema-based solution to model and interact with your MongoDB
    data in JavaScript.
- **MongoDB**: A NoSQL database used to store articles in a flexible, JSON-like 
    format. This is where all the media content lives.
- **dotenv**: A zero-dependency module that loads environment variables from a 
    `.env` file into `process.env`. It's crucial for securely storing sensitive information
    like database connection strings.
- **cors**: Middleware that allows cross-origin requests. This is essential for enabling the
     React frontend (running on a different port) to communicate with the backend.

### Frontend (React)
- **React**: A JavaScript library for building user interfaces. In this project, React is 
    used to create components for listing articles, displaying detailed content, and managing
     forms for adding new articles.
- **react-router-dom**: Provides the necessary tools to handle navigation and routing within 
    the React application. It’s what makes moving between pages (like the article list and 
    article details) smooth and seamless.
- **Axios**: A promise-based HTTP client used to make API requests to the backend. Axios handles 
    all the network requests, from fetching articles to sending new ones to the database.

### Additional Tools
- **MongoDB Compass**: A GUI tool to manage and interact with your MongoDB database. Useful for 
    inserting, updating, and inspecting documents within the `articles` collection.
- **Git**: Version control to track changes in the project files, allowing you to manage different
     versions of your codebase effectively.

----------------------------
🛠️ **3. Installation and Setup:** 🛠️
----------------------------
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/LincolnLedet/TheSensationalist.XYZ
   ```

2. **Navigate to the Backend Directory and Install Dependencies:**
   ```bash
   cd sensationalist-backend
   npm install
   ```

3. **Create a `.env` File in the Backend Directory:**
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/sensationalistdb
     PORT=5000
     ```

4. **Navigate to the Frontend Directory and Install Dependencies:**
   ```bash
   cd ../sensationalist-frontend
   npm install
   ```

5. **Start the Backend Server:**
   ```bash
   node index.js
   ```

6. **Start the React Frontend:**
   ```bash
   npm start
   ```

7. **Access the Application:**
   - Open your browser and go to `http://localhost:3000` to see the app in action.

---
