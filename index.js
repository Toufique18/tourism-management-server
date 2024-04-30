const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhvsuxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//console.log(uri)
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const spotsCollection =client.db('touristsSpotsDB').collection('information');

    app.get("/information", async (req, res)=> {
        const coursor = spotsCollection.find();
        const result = await coursor.toArray()
        res.send(result)
    })

    app.get("/information/:userEmail", async (req, res)=> {
        console.log(req.params.userEmail);
        const result = await spotsCollection.find({userEmail:req.params.userEmail}).toArray();
        console.log(result)
        res.send(result)
        
    })
   
    app.put("/information/:id", async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = {upsert: true}
        const updatedInfo = req.body
        const Infor = {
            $set: {
                image: updatedInfo.image, 
                tourists_spot_name: updatedInfo.tourists_spot_name, 
                country_Name: updatedInfo.country_Name, 
                location: updatedInfo.location, 
                short_description: updatedInfo.short_description, 
                average_cost: updatedInfo.average_cost, 
                seasonality: updatedInfo.seasonality, 
                travel_time: updatedInfo.travel_time, 
                totalVisitorsPerYear: updatedInfo.totalVisitorsPerYear, 
                userEmail: updatedInfo.userEmail, 
                userName: updatedInfo.userName
            }
        }
    
        const result = await spotsCollection.updateOne(filter, Infor, options);
        res.send(result)
    
    })
    



    app.delete("/information/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await spotsCollection.deleteOne(query);
        res.send(result);
    })
//update
    app.delete("/information/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await spotsCollection.deleteOne(query);
        res.send(result);
    })
//update
    app.delete("/information/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await spotsCollection.deleteOne(query);
        res.send(result);
    })

    app.post("/information", async (req, res)=> {
        const newInformation = req.body;
        console.log(newInformation)
        const result = await spotsCollection.insertOne(newInformation)
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


//middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) =>{
    res.send('tourism serever is running')
})

app.listen(port, () =>{
    console.log(`tourism server is running on port: ${port}`)
})


