const {model,Schema} = require('mongoose');
const {createHmac, randomBytes} =  require("crypto");
const { createTokenForUser } = require('../services/authentication');
const userSchema = new Schema({
    fullName : {
        type : String,
        required  : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    salt : {
        type : String
    },
    password : {
        type : String,
        required : true,
    },
    profileImageURL :{
        type : String,
        default : "./images/default.png"
    },
    role :{
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    }
}, {timestamps : true})

userSchema.pre("save" , function (next){
    const user = this;
    if(!user.isModified("password")) return;

    //generate random hash digit
    const salt = randomBytes(16).toString();
    const hashpassword = createHmac("sha256", salt)
    .update(user.password).digest("hex")

    //random key
    this.salt= salt;
    this.password = hashpassword;
    next()
})

userSchema.static("matchPasswordAndGenerateToken", async function (email,password) {

    //find email from db
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');


    const salt = user.salt
    const hashpassword = user.password;

    //hash the login password
    const userProvidedPassword =createHmac('sha256',salt)
    .update(password).digest("hex")

    if(userProvidedPassword !== hashpassword){
        throw new Error("incorrect password");
    }

    //call the jwt token generation function 
    const token = createTokenForUser(user);
    return token;
})

const User = model("user", userSchema);

module.exports = User