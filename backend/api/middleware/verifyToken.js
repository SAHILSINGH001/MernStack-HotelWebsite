const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    
    if(!req.headers.authorization){
      return res.status(400).json({ message: 'Unauthorized - Token not provided' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,secretKey,(err,decoded)=>{
      if(err){
        return res.status(401).send({message:"token is invalid!"})
      }
      req.decoded=decoded;
      next();
    })

   }
module.exports=verifyToken;