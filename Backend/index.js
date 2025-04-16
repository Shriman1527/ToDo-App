const express= require('express');
require("dotenv").config();
const mongoose= require('mongoose');
const { MONGO_URL } = require('./config');
const cors = require('cors');



const app=express();

app.use(cors({
  origin: ['https://to-do-app-frontend-bice.vercel.app' ],
 
  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
   
  credentials: true
}))
app.use(express.json());



const {userRouter}= require('./routes/user'); 








app.use("/user", userRouter);


console.log("MongoDB URI:", process.env.MONGO_URL);
console.log("MONGODB URL", process.env.MONGO_URL);

async function main(){

    console.log("Mogo url", process.env.MONGO_URL);

        if (!process.env.MONGO_URL) {
        throw new Error("MongoDB URL is missing!");
      }

  await  mongoose.connect(process.env.MONGO_URL);
   
    
    app.listen(3000);

    console.log("Listening on port 3000");

}


main();


