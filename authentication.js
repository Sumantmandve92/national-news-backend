const jwt = require("jsonwebtoken");

function varifyToken(req,resp,next){


    const authHeader =req.body.authorization;
    console.log(authHeader,"=token")
    if(authHeader){
        
        // authHeader has Bearer+ " "+ Token
        const token = authHeader.split(" ")[1];

        jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
            if(error){
                resp.status(403).json("token is not valid")
            }
            else{
                req.body["user"]=user;
                next();
            }
        })
    }
    else{
        resp.status(401).json("you are not authenticated")
    }
}
module.exports= varifyToken