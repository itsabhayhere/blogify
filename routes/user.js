const {Router} = require('express');
const router = Router();

const User = require("../models/user")


router.get('/signup' ,(req,res)=>{
    return res.render("signup")
})

router.get('/signin', (req,res)=>{
    return res.render('signin')
})

router.post("/signup" ,async (req , res)=>{
    const {fullName , email , password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('signin')
});

router.post("/signin", async(req,res)=>{
    const {email , password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error : "Incorrect and Password"
        })
    }
})

router.get('/logout', (req,res)=>{
    res.clearCookie("token").redirect('/')
});

router.get('/profile/:id', async(req,res)=>{
    const id = req.params.id;
    const userP = await User.findById(id);
    console.log(userP.profileImageURL)
    return res.render('profile',{
        user : req.user ,
        userP
    })
})

module.exports = router;