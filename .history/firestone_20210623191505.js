const express = require("express");
const app = express();
const mysql = require('mysql2');
// const bodyParser = require('body-parser');
const emailApi = require('./email.js')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.timeout = 0;

const Firestore = require('@google-cloud/firestore');

class User {
    constructor (email, password) {
        this.email = email;
        this.password = password;
    }
    getEmail() {
        return this.email;
    }
    getPass() {
        return this.password;
    }
}

// Firestore data converter
var userConverter = {
    toFirestore: function(city) {
        return {
            email: city.email,
            password: city.password
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.email, data.password);
    }
};
async function checkemail (email){

const snapshot = await db.collection('users').withConverter(userConverter).get().then((doc)=>{
    var user = doc.data();
    console.log(user.getEmail);
});
snapshot.forEach((doc) => {

    var data = doc.data();
    
  console.log(doc.id, '=>', data.entries());
});
}
