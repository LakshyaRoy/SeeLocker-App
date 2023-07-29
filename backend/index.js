const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const port=8000 || process.env.PORT;
const Password=require("./models/password-model");

const app=express();
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to database
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});


app.post("/addPassword",(req,res)=>{
    const {name, password}=req.body;
    const newPassword=new Password({
        name,
        password
    });
    newPassword.save().then(res=>{
        res.json("Successfully created!");
    }).catch(err=>{
        res.json(err);
    })
});

app.listen(port,()=>{
    console.log("Server is running at",port);
})