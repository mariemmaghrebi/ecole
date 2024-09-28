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
// tratement logique:login
app.post("/users/login", (req, res) => {
    console.log('here into bl:login user', req.body); // Affiche les données envoyées dans la requête

    // Recherche d'un utilisateur dans la base de données par numéro de téléphone
    User.findOne({ tel: req.body.tel }).then(
        (doc) => {
            console.log('here user', doc); // Affiche l'utilisateur trouvé ou null si non trouvé

            // Si l'utilisateur n'existe pas (le numéro de téléphone est incorrect)
            if (!doc) {
                res.json({ msg: 'Check your Password/Phone Number' }) // Retourne un message d'erreur
            }
            // Si l'utilisateur est trouvé
            else {
                // Compare le mot de passe envoyé avec celui stocké dans la base de données (hashé)
                bcrypt.compare(req.body.password, doc.password).then(
                    (result) => {
                        console.log('here result', result); // Affiche le résultat de la comparaison (true ou false)

                        // Si le mot de passe est correct
                        if (result) {
                            // Création d'un objet utilisateur pour renvoyer certaines informations
                            let connectedUser = {
                                id: doc._id,
                                firstName: doc.firstName,
                                lastName: doc.lastName,
                                role: doc.role,
                                tel: doc.tel,
                                speciality: doc.speciality,
                                studentTel: doc.studentTel,
                                adress: doc.adress,
                                status: doc.status,
                                img: doc.upload // Lien vers l'image de profil
                            }

                            // Génération d'un token JWT avec les informations de l'utilisateur
                            let token = jwt.sign(connectedUser, secretKey, { expiresIn: '1h' }); // Le token expire après 1h

                            // Retourne le token et confirme que la vérification du mot de passe est réussie
                            res.json({ passwordCheck: true, user: token })
                        }
                        // Si le mot de passe est incorrect
                        else {
                            res.json({ msg: 'Check your Password/Phone Number' }) // Retourne un message d'erreur
                        }

                    }
                )
            }

        }
    )
});


// tratement logique:edit user
app.put("/users/:id", (req, res) => {
    const userId = req.params.id; // ID du teacher

    // Met à jour un utilisateur dans la base de données en fonction de son ID (_id)
    // L'objet `newUser` contient les nouvelles informations de l'utilisateur
    User.updateOne({ _id: userId },{ $set: { status: 'validated' } }).then(
        (result) => {
            // Log pour afficher le résultat de la mise à jour (nombre de documents modifiés)
            console.log('here result after update', result);

            // Vérification si la mise à jour a réussi (vérifie si un document a été modifié)
            if (result.nModified == 1) {
                // Si la mise à jour a bien modifié un utilisateur, renvoie un message de succès
                res.json({ msg: 'ok' });
            }
            else {
                // Si aucun document n'a été modifié, renvoie un message indiquant l'échec de la mise à jour
                res.json({ msg: 'NotOk' });
            }
        })
});
app.get("/users", (req, res) => {
    // Recherche tous les utilisateurs avec le rôle 'teacher'
    User.find({ role: 'teacher' }).then(
        (teachers) => {
            res.json({ teachers });
        }
    )
});
// tratement logique:get all users
app.get("/users", (req, res) => {
    console.log('here into bl:get userq');
    User.find().then(
        (docs) => {
            console.log('here all users from collection', docs);
            res.json({ t: docs });
        }
    )
});
// tratement logique:get user by id
app.get("/users/:id", (req, res) => {
    console.log('here into bl:get user', req.params.id);
    User.findById(req.params.id).then((doc) => {
        console.log('here doc', doc);
        res.json({ user: doc })
    })
});
// tratement logique:delete user by id
app.delete("/users/:id", (req, res) => {
    console.log('here into bl:get user', req.params.id);
    User.deleteOne({ _id: req.params.id }).then(
        (result) => {
            console.log('here result after delete', result);
            if (result.deletedCount == 1) {
                res.json({ isDeleted: true });
            }
            else {
                res.json({ isDeleted: false });
            }
        }
    )
});
// make app importable from another files
module.exports = app;