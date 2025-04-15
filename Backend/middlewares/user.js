
const jwt= require('jsonwebtoken');
// const {JWT_USER_PASSWORD}= require('../config')
const JWT_USER_PASSWORD= process.env.JWT_USER_PASSWORD;


// console.log(JWT_USER_PASSWORD);


function userMiddlewares(req,res,next){
    const token =req.headers.token;

    const decoded= jwt.verify(token,JWT_USER_PASSWORD);

    if(decoded){
        req.userId= decoded.id;
        console.log(decoded.id);
        next();

    }
    else
    {
        res.status(403).json({
            message:"Unauthorized access"

        })
    }

}


module.exports={
    userMiddlewares:userMiddlewares
}