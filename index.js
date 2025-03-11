const path = require('path')
const cookieParser = require('cookie-parser')
// express setup
const express = require("express")
const app = express()

const Blog = require('./models/blog');
// port on server running
const PORT = 4000

// Database setup
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/blogify");

//Routes initializations
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')

//middlewares
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')))



//setting up the ejs 
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//index page route
app.get('/' , async (req,res)=>{
    const allBlog = await Blog.find({})
    res.render("home", {
        user : req.user,
        blogs : allBlog
    })
})

//user api route
app.use('/user',userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, ()=>console.log("Server Started"))