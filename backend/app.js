// import express module
const express = require('express');
// import body-parser module
const bodyParser = require('body-parser');
// import bcrypt module
const bcrypt = require('bcrypt');
// import mongoose module
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecoleDB');
// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session')
// import multer module
const multer = require('multer');
// import path module(sans installation)
const path = require('path');

// creation application express (app)
const app = express();
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/shortcut', express.static(path.join('backend/images')))
const MIME_TYPE = {
    'image/png': 'png', 'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/images')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = Date.now() + name + '-' + '-ecole-' + '.' + extension;
        cb(null, imgName);
    }
});
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
const secretKey = 'mariem23';
app.use(session({
    secret: secretKey,
}));

// models importations
const Course = require('./models/couse');
const User = require('./models/user');
usersTab = [
    { firstName: 'mariem', lastName: 'maghrebi', adress: 'mourouj', email: 'mariem@gmail.com', tel: '26310199' },
    { firstName: 'mariem', lastName: 'maghrebi', adress: 'mourouj', email: 'mariem@gmail.com', tel: '26310199' },
    { firstName: 'mariem', lastName: 'maghrebi', adress: 'mourouj', email: 'mariem@gmail.com', tel: '26310199' },
    { firstName: 'mariem', lastName: 'maghrebi', adress: 'mourouj', email: 'mariem@gmail.com', tel: '26310199' }
];
coursesTab = [
    { name: 'java', description: 'java is a programming language', duration: '1h' },
    { name: 'java', description: 'java is a programming language', duration: '1h' },
    { name: 'java', description: 'java is a programming language', duration: '1h' },
    { name: 'java', description: 'java is a programming language', duration: '1h' }
]
//traitement logique des requetes
// tratement logique:add user(signup)
app.post("/users", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log('here into bl:Add user', req.body);

    // Vérification de l'unicité de l'email
    User.findOne({ email: req.body.email }).then((existingUser) => {
        console.log("here user doc", existingUser);

        if (existingUser) {
            // Si l'utilisateur existe déjà, renvoyer isAdded: false
            return res.json({ isAdded: false, msg: 'Email already exists' });
        }

        // Si le rôle est 'parent', on vérifie le studentTel
        if (req.body.role === 'parent') {
            User.findOne({ role: 'student', tel: req.body.studentTel }).then((studentDoc) => {
                // Si aucun étudiant n'est trouvé avec le tel donné, empêcher la création du parent
                if (!studentDoc) {
                    return res.json({ isAdded: false, msg: 'No matching student found for the given studentTel' });
                }

                // Si un étudiant est trouvé, on continue avec la création de l'utilisateur
                bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                    console.log('crypted Password', cryptedPassword);
                    req.body.password = cryptedPassword;

                    // Gérer l'upload de l'image de profil
                    if (req.file) {
                        req.body.upload = `http://localhost:3000/shortcut/${req.file.filename}`;
                    } else {
                        // Si aucune image n'est fournie, utiliser une image par défaut
                        req.body.upload = "http://localhost:3000/shortcut/profil.png";
                    }

                    // Créer un nouvel utilisateur et sauvegarder dans la base de données
                    const newUser = new User(req.body);
                    newUser.save();
                    return res.json({ isAdded: true });
                });
            });
        } else {
            // Si le rôle n'est pas 'parent', on procède directement à la création de l'utilisateur
            bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                console.log('crypted Password', cryptedPassword);
                req.body.password = cryptedPassword;
                if (req.body.role === 'teacher') {
                    req.body.status = 'not Validate';
                }
                // Gérer l'upload de l'image de profil
                if (req.file) {
                    req.body.upload = `http://localhost:3000/shortcut/${req.file.filename}`;
                } else {
                    // Si aucune image n'est fournie, utiliser une image par défaut
                    req.body.upload = "http://localhost:3000/shortcut/profil.png";
                }

                // Créer un nouvel utilisateur et sauvegarder dans la base de données
                const newUser = new User(req.body);
                newUser.save();
                return res.json({ isAdded: true });
            });
        }
    });
});


// tratement logique:edit user
app.put("/users", (req, res) => {
    console.log('here into bl:Add edit user', req.body);
    let newUser = req.body;
    let pos = usersTab.findIndex((elt) => elt.id == newUser.id);
    usersTab[pos] = newUser;
    res.json({ msg: 'ok' });
});
// tratement logique:get all users
app.get("/users", (req, res) => {
    console.log('here into bl:get user');
    res.json({ t: usersTab });
});
// tratement logique:get user by id
app.get("/users/:id", (req, res) => {
    console.log('here into bl:get user by id', req.params.id);
    let userId = req.params.id;
    let user = usersTab.find((elt) => elt.id == userId);
    res.json({ user: user })
});
// tratement logique:delete user by id
app.delete("/users/:id", (req, res) => {
    console.log('here into bl:get user', req.params.id);
    let userId = req.params.id;
    let pos = usersTab.findIndex((elt) => elt.id == userId);
    console.log('here position', pos);
    usersTab.splice(pos, 1);
    res.json({ isDeleted: true })
});
// tratement logique:add course
app.post("/courses", (req, res) => {
    console.log('here into bl:Add course', req.body);
    let course = req.body;
    coursesTab.push(course);
    res.json({ isAdded: true });
});
// tratement logique:edit course
app.put("/courses", (req, res) => {
    console.log('here into bl:Add edit course', req.body);
    let newCourse = req.body;
    let pos = coursesTab.findIndex((elt) => elt.id == newCourse.id);
    coursesTab[pos] = newCourse;
    res.json({ msg: 'ok' });
});
// tratement logique:get all courses
app.get("/courses", (req, res) => {
    console.log('here into bl:get course');
    res.json({ t: coursesTab });
});
// tratement logique:get course by id
app.get("/courses/:id", (req, res) => {
    console.log('here into bl:get course by id', req.params.id);
    let courseId = req.params.id;
    let course = coursesTab.find((elt) => elt.id == courseId);
    res.json({ course: course })
});
// tratement logique:delete course by id
app.delete("/courses/:id", (req, res) => {
    console.log('here into bl:get course', req.params.id);
    let courseId = req.params.id;
    let pos = coursesTab.findIndex((elt) => elt.id == courseId);
    console.log('here position', pos);
    coursesTab.splice(pos, 1);
    res.json({ isDeleted: true })
});
// make app importable from another files
module.exports = app;