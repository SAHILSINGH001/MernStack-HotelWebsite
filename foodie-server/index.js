const express = require('express')
const app = express()
const cors=require('cors')
const port = 8000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middleware
app.use(cors());
app.use(express.json());

//mongodb connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://netrapalsinghrajput625:Manju1234@cluster0.lquf1et.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
   
    // database and collections
    const menuCollections=client.db("demo-foodi-client").collection("menu");
    const cartCollections=client.db("demo-foodi-client").collection("cartItems");
    const userCollections=client.db("demo-foodi-client").collection("userdetails");
    
   //all menu items operation
   app.get('/menu',async(req,res)=>{
    const menu= menuCollections.find();
    const result=await menu.toArray();
        res.send(result);
    
   })
   //post a card item to the server
   app.post("/carts",async(req,res)=>{
    const cartItem=req.body;
    const result=await cartCollections.insertOne(cartItem);
    res.send(result)
   })
   //to fetch an cart item using email
   app.get('/carts',async(req,res)=>{
    const email=req.query.email;
    const filter={email:email};
    //const result=await cartCollections.find(filter).toArray();
    const items=cartCollections.find(filter);
    const result=await items.toArray();
    res.send(result);
   })
  
   
   //delet items from the cart
   app.delete("/carts/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await cartCollections.deleteOne(filter);
    res.send(result);
   })
   
    //get specific items
    app.get("/carts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await cartCollections.findOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch cart item' });
      }
    });


  //update card quantity
  app.put("/carts/:id",async(req,res)=>{
    const id=req.params.id;
    const {quantity}=req.body;
    const filter={_id :new ObjectId(id)};
    const options={upsert:true};
    const updateDoc={
      $set:{
        
          quantity:parseInt(quantity,10),
        
      }
    };
    const result=await cartCollections.updateOne(filter,updateDoc,options);
    res.send(result);

  })

  //store user information who would be login
  app.get('/userinfo', async (req, res) => {
    try {
      const allUsers = await userCollections.find({}).toArray();
      res.send(allUsers);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch user information' });
    }
  });
  //post new user information
  app.post("/userinfo", async (req, res) => {
    try {
      const userItem = req.body;
      const result = await userCollections.insertOne(userItem);
      res.status(201).send(result);
    } catch (error) {
      console.error("Error adding user information:", error);
      res.status(500).send({ error: "Failed to add user information", message: error.message });
    }
  });

  //delete a user
  app.delete("/userinfo/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await userCollections.deleteOne(filter);
      res.send(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({ error: "Failed to delete user", message: error.message });
    }
  });
  


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})