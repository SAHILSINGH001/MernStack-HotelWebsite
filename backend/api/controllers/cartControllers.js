const Cart = require("../model/Carts");

//get carts using email
const getCartByEmail=async(req,res)=>{
    try{
        const email=req.query.email;
        const query={email:email};
        const result=await Cart.find(query).exec();
        res.json(result)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//post a cart when add-to-cart button clicked
const addToCart=async(req,res)=>{
    const {menuItemId,name, recipe,image,price, quantity,email}=req.body;
    try{
         //existing menu item
         const existingCartItem=await Cart.findOne({menuItemId});
         if(existingCartItem){
            return res.status(400).json({message:"Product already present in cart"})
         }

         const cartItem=await Cart.create({
            menuItemId,name, recipe,image,price, quantity,email
         })
         res.status(201).json(cartItem)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//delete a cart items
const deleteCart=async(req,res)=>{
    const cartId=req.params.id;
    try{
       const deletedCart=await Cart.findByIdAndDelete(cartId);
       if(!deletedCart){
        return res.status(401).json({message:"cart item not found"})
       }
       res.status(200).json({message:"cart item deleted successfully"})
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

//update a quantity
const updateCart=async(req,res)=>{
    const cartId=req.params.id;
    const {menuItemId,name, recipe,image,price, quantity,email}=req.body;
    try{
         const updateCarts=await Cart.findByIdAndUpdate(
            cartId,{menuItemId,name, recipe,image,price, quantity,email},{
                new:true,runValidators:true,
            }
         )
         if(!updateCarts){
            return res.status(404).json({message:"cart item is not found"})
         }
         res.status(200).json(updateCarts)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//get single cart
const getSingleCart=async(req,res)=>{
    const cartId=req.params.id;
    try{
        const cartItem=await Cart.findById(cartId);
        res.status(200).json(cartItem)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports={
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart

}