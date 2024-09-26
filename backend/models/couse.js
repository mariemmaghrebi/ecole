// import mongoose module
const mongoose=require('mongoose');
// create course schema
const courseSchema=mongoose.Schema({
    //attr:type
    name:String,
    descreption:String,
    duration:String
    
});
// affect model name to schema
const course=mongoose.model('Course',courseSchema);
// make course exportable
module.exports=course;