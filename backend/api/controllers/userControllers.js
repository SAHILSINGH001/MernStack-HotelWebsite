const User = require("../model/User")

//get all user 
const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find({}).exec();
        res.status(200).json(users);

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//post a new user
const createUsers=async(req,res)=>{
    const user=req.body;
    const query={email:user.email}
    try{
        const existinguser=await User.findOne(query);
        if(existinguser){
            return res.status(302).json({message:"user already exists"})
        }
        const result=await User.create(user);
        res.status(200).json(result);

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//delete a user
const deleteUsers=async(req,res)=>{
    const userId=req.params.id;
    
    try{
       const deletedUser=await User.findByIdAndDelete(userId);
       //if user is not found
       if(!deleteUsers){
        return res.status(404).json({message:"user not found"})
       }   
     res.status(200).json({message:"user deleted successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//get admin
const getAdmin=async(req,res)=>{
    const email=req.params.email;
    const query={email:email};
    
    try{
       const user=await User.findOne(query);
       if(email!==req.decoded.email){
        return res.status(403).send({message:"Forbidden access"})
       }
       let admin=false;
       if(user){
        admin=user?.role==="admin";
       }
       res.status(200).json({admin})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//make admin of user
const makeAdmin=async(req,res)=>{
    const userId=req.params.id;
    const {name,email,photoURL,role}=req.body;
    try{
      const updatedUser=await User.findByIdAndUpdate(userId,{
        role:"admin"
      },
      {new:true,runValidators:true}
      );
      if(!updatedUser){
        return res.status(404).json({message:"user not found"})
      }
      res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
// update a user
const updateProfile=async(req,res)=>{
    const userId=req.params.id;
    const {name,email,photoURL,role}=req.body;
    try{
         const updateUser=await User.findByIdAndUpdate(userId,{name,email,photoURL,role},{
            new:true,
            runValidators:true
         });
         if(!updateUser){
            res.status(400).json({message:"User doesnot Exists"});
         }
         res.status(200).json(updateUser)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    getAllUsers,
    createUsers,
    deleteUsers,
    getAdmin,
    makeAdmin,
    updateProfile
}