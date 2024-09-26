// import mongoose module
const mongoose=require('mongoose');
// create user schema
const userSchema=mongoose.Schema({
    //attr:type
    firstName:String,
    lastName:String,
    email:String,
    tel:String,
    studentTel:String,
    password:String,
    adress:String,
    speciality:String,
    role:String,
    status:String,
    upload:String
});
// affect model name to schema
const user=mongoose.model('User',userSchema);
// make user exportable
module.exports=user;






