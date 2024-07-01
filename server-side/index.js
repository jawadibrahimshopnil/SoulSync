const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://soulsync-28b73.web.app",
      "https://soulsync-28b73.firebaseapp.com"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// const uri = `mongodb://127.0.0.1:27017`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdrrfs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Database and Collections
    const soulSyncDB = client.db("soulSync");
    const userCollection = soulSyncDB.collection("users");
    const biodataCollection = soulSyncDB.collection("biodatas");
    const storyCollection = soulSyncDB.collection("stories");
    const contactReqCollection = soulSyncDB.collection("contactReq");
    const premiumReqCollection = soulSyncDB.collection("premiumReq");
    const paymentCollection = soulSyncDB.collection("payment");

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    // jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });

      res.cookie("token", token, cookieOptions).send({ token });
    });

    // verify jwt
    const verifyJWT = async (req, res, next) => {
      const token = req?.cookies?.token;

      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access"});
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async(req, res, next) =>{
      const email = req.decoded.email;
      const query = {email: email};
      const user = await userCollection.findOne(query);
      const isAdmin = user?.isAdmin === "admin";
      if(!isAdmin){
        return res.status(403).send({message: "forbidden access"})
      }
      next();
    }

    // logout user
    app.post("/logout", async (req, res) => {
      const user = req.body;

      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });

    // add user to database
    app.post("/adduser", async (req, res) => {
      const userData = req.body;
      const query = { email: userData.email };

      const isUserExists = await userCollection.findOne(query);
      if (isUserExists) {
        return res.send({ isUserExists: true });
      }

      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    // get users
    app.get('/users', verifyJWT, verifyAdmin, async(req, res)=>{
      const search = req?.query?.search;
      let query = {}
      if(search){
        query = {
          name: {$regex: search, $options: 'i'}
        } 
      }
      const result = await userCollection.find(query).toArray();
      res.send(result);
    })

    // isadmin
    app.get("/isadmin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if(email !== req.decoded.email){
        return res.status(403).send({message: "forbidden access email not match to decoded"})
      }

      const user = await userCollection.findOne({ email: email });
      let isAdmin = false;
      if(user){
        isAdmin = user?.isAdmin === "admin";
      }
      res.send({ isAdmin });
    });

    // is premium
    app.get("/ispremium/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if(email !== req.decoded.email){
        return res.status(403).send({message: "forbidden access"})
      }

      const user = await userCollection.findOne({ email: email });
      let isPremium = false;
      if(user){
        isPremium = user?.isPremium === "premium";
      }
      res.send({ isPremium });
    });

    // create payment intent
    app.post('/create-payment-intent', verifyJWT, async(req, res)=>{
      const {price} = req.body;
      const amount = parseInt(price*100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'], 
      });

      res.send({clientSecret: paymentIntent.client_secret})
    })

    // add or update biodata to db
    app.put("/biodata/add", verifyJWT, async (req, res) => {
      const biodata = req.body;

      let biodataId = 1;
      const lastBiodata = (
        await biodataCollection.find().sort({ _id: -1 }).limit(1).toArray()
      )[0];
      if (lastBiodata) {
        biodataId = lastBiodata.biodataId + 1;
      }

      const existingBio = await biodataCollection.findOne({
        email: biodata.email,
      });

      if (!existingBio) {
        biodata.biodataId = biodataId;
        const result = await biodataCollection.insertOne(biodata);
        return res.send(result);
      } else {
        biodata.biodataId = existingBio.biodataId;
        const filter = { email: existingBio.email };
        const updateDoc = {
          $set: {
            ...biodata,
          },
        };
        const result = await biodataCollection.updateOne(filter, updateDoc);
        return res.send(result);
      }
    });

    // get 6 premium user
    app.get("/six-premium", async(req, res)=>{
      const sixPremiumUser = await userCollection.find({isPremium: "premium"}).limit(6).toArray();
      const premiumEmails = sixPremiumUser.map(user=>user.email);

      const bios = await biodataCollection.find({email: {$in: premiumEmails}}, {sort:{age: 1}}).toArray();
      res.send(bios)
    })

    // get bio info for cards
    app.get("/biodatas/card", async (req, res) => {
      const page = parseInt(req.query?.page) || 0;
      const size = parseInt(req.query?.size) || 2;
      const query = {};
      const options = {
        projection: {
          profileIMG: 1,
          biodataId: 1,
          type: 1,
          permanentDivision: 1,
          occupation: 1,
          age: 1,
        },
      };

      const result = await biodataCollection.find(query, options).skip(page * size).limit(size).toArray();
      res.send(result);
    });

    // get similiar
    app.get("/similarbio/:type", verifyJWT, async(req, res)=>{
      const urlType = req.params.type;
      const type = urlType.charAt(0).toUpperCase()+urlType.slice(1);
      const pipeline = [
        {$match: {type: type}},
        {$sample: {size: 3}}
      ]
      const result = await biodataCollection.aggregate(pipeline).toArray();
      res.send(result)
    })

    // get specific bio
    app.get("/biodata/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { biodataId: parseInt(id) };
      const result = await biodataCollection.findOne(query);
      res.send(result);
    });

    // get specific bio
    app.get("/mybiodata", verifyJWT, async (req, res) => {
      const user = req.decoded.email;
      const query = { email: user };
      const result = await biodataCollection.findOne(query);
      res.send(result);
    });

    // get estimated bio
    app.get("/biodatas-count", async(req, res)=>{
      const count = await biodataCollection.estimatedDocumentCount();
      res.send({count})
    })

    // fav bios
    app.get("/myfavbio", verifyJWT, async (req, res) => {
      const user = req.decoded.email;
      const queryId = { email: user };
      const optionsId = {
        projection: {
          _id: 0,
          favBio: 1,
        },
      };
      const { favBio } = await userCollection.findOne(queryId, optionsId);

      if (!favBio) {
        return res.send({ message: "no data found" });
      }

      const query = {
        biodataId: {
          $in: favBio,
        },
      };
      const options = {
        projection: {
          name: 1,
          occupation: 1,
          biodataId: 1,
          permanentDivision: 1,
        },
      };

      const favBios = await biodataCollection.find(query, options).toArray();
      res.send(favBios);
    });

    // add to fav
    app.post("/favorite/add/:id", verifyJWT, async (req, res) => {
      const user = req.decoded.email;
      const biodataId = req.params.id;

      if (!biodataId) {
        return res.send({ message: "id is not correct" });
      }

      const filter = { email: user };
      const updateDoc = {
        $addToSet: {
          favBio: parseInt(biodataId),
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);

      res.send(result);
    });

    // delete fav bio
    app.patch("/favorite/delete/:id", verifyJWT, async (req, res) => {
      const user = req.decoded.email;
      const biodataId = req.params.id;

      if (!biodataId) {
        return res.send({ message: "id is not correct" });
      }

      const filter = { email: user };
      const updateDoc = {
        $pull: {
          favBio: parseInt(biodataId),
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);

      res.send(result);
    });

    // add success story
    app.post("/success-story", verifyJWT, async(req, res)=>{
      const data = req.body;
      const result = await storyCollection.insertOne(data);
      res.send(result);
    }) 

    // get stories
    app.get('/success-stories', async(req, res)=>{
      const result = await storyCollection.find().sort({marriageDate: -1}).toArray();
      res.send(result);
    })

    // get stats
    app.get('/stats', async(req, res)=>{
      const totalBio = await biodataCollection.countDocuments();
      const maleBio = await biodataCollection.countDocuments({type: "Male"});
      const femaleBio = totalBio - maleBio;
      const totalMarriage = await storyCollection.countDocuments();

      const totalRevenue = (await paymentCollection.countDocuments())*5;
      
      const totalUser = await userCollection.countDocuments(); 
      const premiumUser = await userCollection.countDocuments({isPremium: "premium"});
      const normalUser = totalUser - premiumUser;
      const statsData = {
        totalBio,
        maleBio,
        femaleBio,
        premiumUser,
        normalUser,
        totalMarriage,
        totalRevenue
      }
      res.send(statsData)
    })

    // add payment
    app.post("/payment", verifyJWT, async(req, res)=>{
      const data = req.body;
      const result = await paymentCollection.insertOne(data);
      res.send(result);
    })

    // add contact req
    app.post("/request-contact", verifyJWT, async(req, res)=>{
      const data = req.body;
      const result = await contactReqCollection.insertOne(data);
      res.send(result)
    })

    // my contact req
    app.get('/mycontacts', verifyJWT, async(req, res)=>{
      const user = req.decoded.email;
      const result = await contactReqCollection.find({reqByEmail: user}).toArray();
      res.send(result);
    })

    // delete contact req
    app.delete("/request-contact/:id", verifyJWT, async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await contactReqCollection.deleteOne(query);
      res.send(result)
    })

    // get contact req
    app.get("/requested-contact", verifyJWT, verifyAdmin, async(req, res)=>{
      const result = await contactReqCollection.find().toArray();
      res.send(result);
    })

    // approve contact
    app.patch("/approve/:biodataId", verifyJWT, verifyAdmin, async(req, res)=>{
      const biodataId = parseInt(req.params?.biodataId);
      const reqBioQuery = {biodataId: biodataId};
      const {mobileNum:reqMobileNum, email:reqEmail} = await biodataCollection.findOne(reqBioQuery);

      const reqForBioId = {reqForBioId: biodataId};
      const updataDoc = {
        $set:{
          status: "approved",
          reqMobileNum,
          reqEmail
        }
      }
      const result = await contactReqCollection.updateOne(reqForBioId, updataDoc);

      res.send(result);
    })

    // post premium req
    app.post("/request-premium", verifyJWT, async(req, res)=>{
      const data = req.body;
      const filter = {biodataId: parseInt(data.biodataId)};
      const updateDoc = {
        $set: data
      }
      const result = await premiumReqCollection.updateOne(filter, updateDoc, {upsert: true});
      res.send(result)
    })

    // get premium 
    app.get("/requested-premium", verifyJWT, verifyAdmin, async(req, res)=>{
      const result = await premiumReqCollection.find().toArray();
      res.send(result);
    })

    // make premium
    app.patch("/make-premium/:email", verifyJWT, verifyAdmin, async(req, res)=>{
      const email = req.params.email;
      const userFilter = {email: email}
      const updateDoc = {
        $set:{
          isPremium: "premium"
        }
      }
      await premiumReqCollection.updateOne(userFilter, {$set:{status: "approved"}});
      const result = await userCollection.updateOne(userFilter, updateDoc);
      res.send(result)
    })

    // make admin
    app.patch("/make-admin/:email", verifyJWT, verifyAdmin, async(req, res)=>{
      const email = req.params.email;
      const userFilter = {email: email}
      const updateDoc = {
        $set:{
          isAdmin: "admin"
        }
      }
      const result = await userCollection.updateOne(userFilter, updateDoc);
      res.send(result)
    })

    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Alhamdulillah server is running.");
});

app.listen(port, () => {
  console.log(`Bismillah, server is running on port: ${port}`);
});
