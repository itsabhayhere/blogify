const JWT = require("jsonwebtoken")

//screte key use to generate token
const secrete = "$uperM@n1212";

function createTokenForUser(user){

    const payload = {
        name : user.fullName,
        _id : user._id,
        email : user.email,
        role : user.role,
        profileImageURL : user.profileImageURL
    }

    const token  = JWT.sign(payload, secrete);
    return token;

}

function validateToken(token) {
    const payload = JWT.verify(token, secrete)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}