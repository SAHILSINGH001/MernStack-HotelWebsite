const express = require('express');
const app = express();
const cors = require('cors');
const port = 7001;
const mongoose = require('mongoose');
//for jwt token
const jwt = require('jsonwebtoken');

//token: 'a3c2c17e9805a6331165637e04b4928fc719a3ba76b747c006d942dc5b9831665d8460e7e7aaf64f4f657f17755cdba848121e1c2a0cb167762c7763fdee816f'

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://SahilSingh:Manju1234@demo-foodi-client.slfuerk.mongodb.net/demo-foodi-client?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDb is connected Successfully');


   //jwt authentications
   const secretKey = 'a3c2c17e9805a6331165637e04b4928fc719a3ba76b747c006d942dc5b9831665d8460e7e7aaf64f4f657f17755cdba848121e1c2a0cb167762c7763fdee816f';
  app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, secretKey, {
        expiresIn: '6hr'
      });
      res.send({ token });
    });

   //verify jwt token
   //middleware
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

   
   


    
    // Routes setup after successful DB connection
    const menuRoutes = require('./api/routes/menuRoutes');
    app.use('/menu', menuRoutes);

    const cartRoutes=require('./api/routes/cartRoutes');
    app.use('/carts',cartRoutes);
   
   
   const userRoutes=require('./api/routes/userRoutes');
   app.use('/users',userRoutes);
   
   
   
   
   
   
    // Default route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(error => {
    console.log("Error connecting to DB", error);
    // Handle the error further if needed
  });
