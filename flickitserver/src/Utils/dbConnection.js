const mongoose = require ( "mongoose");

 const dbConnection=()=>{
    // mongoose.connect("mongodb+srv://nora:Flickit@cluster0.ptpifd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    //     console.log("database connected");
    // }).catch((err)=>{
    //     console.log("error in connect");
    // })
    mongoose.connect("mongodb+srv://testdatabase:mongodbfortest@cluster0.cewkt.mongodb.net/").then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("error in connect");
    })
}
module.exports =dbConnection