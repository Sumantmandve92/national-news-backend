const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
 photoURLs:{
    type:Array,
    default:[]
 },
 title:{
    type:String,
    require:true,

 },
 category:{
    type:String
 },
 city:{
    type:String,
    require:true
 },
 story:{
    type:String,
    require:true

 },
 likes:{
    type:Array,
    default:[]
 },
 comments:{
   type:Array,
   default:[{}]
 }



},
    { timestamps: true }
);


module.exports = mongoose.model("news", newsSchema);