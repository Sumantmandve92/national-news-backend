const express =require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

// ========================middleware=====================================
app.use(express.json());
app.use(cors());
dotenv.config();

// ===============db-connection==========================================

mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    console.log("db connected");
})
.catch((error)=>{
    console.log(error);
})

// ==================================api routes===========================
const userRoutes=require("./routes/user");
const newsRoutes=require("./routes/news");
const authRoutes=require("./routes/auth");



app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/news",newsRoutes);



app.listen(process.env.PORT,()=>{
    console.log("national news server is running on "+process.env.PORT)
})

