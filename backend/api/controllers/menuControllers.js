const Menu = require("../model/Menu");


const getAllMenuItems=async (req, res) => {
    try {
        const users = await Menu.find({}).sort({createdAt:-1}).exec();
        res.json(users);
    } catch (error) {
        res.status(500).send({
            message: 'Error finding users',
            success: false,
            error: error.message
        });
    }
}

//post a menu
const postMenuItem=async(req,res)=>{
    const newItem=req.body;
    try{
       
        const result= await Menu.create(newItem);
        res.status(200).json(result);
    }catch(error){
        res.status(500).send({
            message: 'Error finding users',
            success: false,
            error: error.message
        });
    }
}

//delete an menu item
const deleteMenuItem=async(req,res)=>{
    const menuId=req.params.id;
    try{
        const deletedItem=await Menu.findByIdAndDelete(menuId);
        res.status(200).json({message:"Item Deleted Successfully"})
    }catch(error){
        res.status(500).json({message:"Invalid Request"})
    }
}

//get single menu item
const getSingleMenuItem = async (req, res) => {
    const menuId = req.params.id;
  
    try {
      const menu = await Menu.findById(menuId);
      if (!menu) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).json(menu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
 //update Menu Items
 
 const UpdateMenuItems=async(req,res)=>{
    const menuId=req.params.id;
    const {_id,name,recipe,image,category,price}=req.body;
    try{
         const updateMenu=await Menu.findByIdAndUpdate(
            menuId,{_id,name,recipe,image,category,price},{
                new:true,runValidators:true,
            }
         )
         if(!updateMenu){
            return res.status(404).json({message:"cart item is not found"})
         }
         res.status(200).json(updateMenu)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    getSingleMenuItem,
    UpdateMenuItems
}