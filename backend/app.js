// import express module
const express = require('express');
// import body-parser module
const bodyParser = require('body-parser');
// creation application express (app)
const app = express();
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/shortcut', express.static(path.join('backend/images')))
// const MIME_TYPE = {
//     'image/png': 'png', 'image/jpeg': 'jpg',
//     'image/jpg': 'jpg'
// }
// Security configuration
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(

        "Access-Control-Allow-Headers",

        "Origin, Accept, Content-Type, X-Requested-with, Authorization"

    );

    res.setHeader(

        "Access-Control-Allow-Methods",

        "GET, POST, DELETE, OPTIONS, PATCH, PUT"

    );

    next();

});
usersTab = [
    { firstName:'mariem',lastName:'maghrebi',adress:'mourouj',email:'mariem@gmail.com',tel:'26310199' },
    { firstName:'mariem',lastName:'maghrebi',adress:'mourouj',email:'mariem@gmail.com',tel:'26310199' },
    { firstName:'mariem',lastName:'maghrebi',adress:'mourouj',email:'mariem@gmail.com',tel:'26310199' },
    { firstName:'mariem',lastName:'maghrebi',adress:'mourouj',email:'mariem@gmail.com',tel:'26310199' }
];
coursesTab=[
    {name:'java',description:'java is a programming language',duration:'1h'},
    {name:'java',description:'java is a programming language',duration:'1h'},
    {name:'java',description:'java is a programming language',duration:'1h'},
    {name:'java',description:'java is a programming language',duration:'1h'}
]
//traitement logique des requetes
// tratement logique:add user
app.post("/users", (req, res) => {
    console.log('here into bl:Add user',req.body);
    let user=req.body;
    usersTab.push(user);
    res.json({isAdded:true});
});
// tratement logique:edit user
app.put("/users", (req, res) => {
    console.log('here into bl:Add edit user',req.body);
    let newUser=req.body;
    let pos=usersTab.findIndex((elt)=>elt.id==newUser.id);
    usersTab[pos]=newUser;
    res.json({msg:'ok'});
});
// tratement logique:get all users
app.get("/users", (req, res) => {
    console.log('here into bl:get user');
    res.json({ t: usersTab });
});
// tratement logique:get user by id
app.get("/users/:id", (req, res) => {
    console.log('here into bl:get user by id',req.params.id);
    let userId=req.params.id;
    let user=usersTab.find((elt)=> elt.id==userId);
    res.json({user:user})
});
// tratement logique:delete user by id
app.delete("/users/:id", (req, res) => {
    console.log('here into bl:get user',req.params.id);
    let userId=req.params.id;
    let pos=usersTab.findIndex((elt)=>elt.id==userId);
    console.log('here position',pos);
    usersTab.splice(pos,1);
    res.json({isDeleted:true})
});
// tratement logique:add course
app.post("/courses", (req, res) => {
    console.log('here into bl:Add course',req.body);
    let course=req.body;
    coursesTab.push(course);
    res.json({isAdded:true});
});
// tratement logique:edit course
app.put("/courses", (req, res) => {
    console.log('here into bl:Add edit course',req.body);
    let newCourse=req.body;
    let pos=coursesTab.findIndex((elt)=>elt.id==newCourse.id);
    coursesTab[pos]=newCourse;
    res.json({msg:'ok'});
});
// tratement logique:get all courses
app.get("/courses", (req, res) => {
    console.log('here into bl:get course');
    res.json({ t: coursesTab });
});
// tratement logique:get course by id
app.get("/courses/:id", (req, res) => {
    console.log('here into bl:get course by id',req.params.id);
    let courseId=req.params.id;
    let course=coursesTab.find((elt)=> elt.id==courseId);
    res.json({course:course})
});
// tratement logique:delete course by id
app.delete("/courses/:id", (req, res) => {
    console.log('here into bl:get course',req.params.id);
    let courseId=req.params.id;
    let pos=coursesTab.findIndex((elt)=>elt.id==courseId);
    console.log('here position',pos);
    coursesTab.splice(pos,1);
    res.json({isDeleted:true})
});
// make app importable from another files
module.exports = app;