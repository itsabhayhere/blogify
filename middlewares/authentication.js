const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) =>{
        // assigning the payload value of token which in cookie
        const tokenCookieValue = req.cookies[cookieName]

        //if there is no value 
        if(!tokenCookieValue) {
            return next()
        }

        try {
            //validating token value and assging its payload
            const payloadValue  = validateToken(tokenCookieValue);
            req.user = payloadValue;
           
        }catch(error) {}
        
        next()
    };
}

module.exports = {checkForAuthenticationCookie}