Blogging Web Application
A simple blogging web application built with Node.js, Express, and other essential technologies. This platform allows users to create, read, update, and delete blog posts.

Features
User authentication (sign up, login, logout)
Create, read, update, and delete blog posts
Basic user roles (admin and regular user)
Rich text editor for writing blog posts
View posts by category and tags
Technologies Used
Node.js - JavaScript runtime
Express.js - Web framework for Node.js
MongoDB - Database to store blog data
Mongoose - MongoDB object modeling for Node.js
Passport.js - Authentication middleware
EJS - Templating engine for dynamic HTML rendering
Bootstrap - Front-end framework for responsive design
Installation
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (>=v14)
MongoDB (or use a cloud MongoDB service like MongoDB Atlas)
Clone the Repository
Clone this repository to your local machine:

bash
Copy
git clone https://github.com/your-username/blogging-web.git
Navigate into the project directory:

bash
Copy
cd blogging-web
Install Dependencies
Install the required npm packages:

bash
Copy
npm install
Set Up Environment Variables
Create a .env file in the root directory of the project and add the following configuration:

plaintext
Copy
MONGO_URI=mongodb://localhost:27017/blogging-app
SESSION_SECRET=your-session-secret
Replace MONGO_URI with your MongoDB connection string if you're using a remote database.
Replace SESSION_SECRET with a secret string used for session management.
Start the Application
Start the application in development mode:

bash
Copy
npm start
By default, the app will run on http://localhost:3000.

Usage
Visit http://localhost:4000 to access the blog application.
Users can register, log in, create posts, and interact with blog content.
Admin users can manage all posts and users.
