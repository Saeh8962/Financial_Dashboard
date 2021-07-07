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

// const Firestore = require('@google-cloud/firestore');

// const db = new Firestore({
//   projectId: 'stock-project-317717',
//   keyFilename: './firestone_key.json',
// });
//open the database

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306
});

db.connect(function(err){
    if(err){
        console.log(err);  
        throw err;
    } 
    console.log("connected!");
  });


// class User {
//     constructor (email, password) {
//         this.email = email;
//         this.password = password;
//     }
//     getEmail() {
//         return this.email;
//     }
//     getPass() {
//         return this.password;
//     }
// }

// // Firestore data converter
// var userConverter = {
//     toFirestore: function(city) {
//         return {
//             email: city.email,
//             password: city.password
//             };
//     },
//     fromFirestore: function(snapshot, options){
//         const data = snapshot.data(options);
//         return new User(data.email, data.password);
//     }
// };

// async function checkemail (email){
// const aTuringRef = db.collection('users').doc('sehrlich').withConverter(userConverter).set;
// const snapshot = await db.collection('users').withConverter(userConverter).get();
// snapshot.forEach((doc) => {

//     var user = doc.data();
    
//   console.log(doc.id, '=>', user.getEmail);
// });
// }

  
//   function MinutesToMilleSeconds(min){
//       return min*60*1000;
//   }

  app.post('/api/signup', function(req, res){
    var email = req.body.email
    var password = req.body.password
    console.log(email,password);
 
    //check if the email is in use, if it is not create the users
    var sql_email_query= "SELECT * FROM stockapp.users WHERE email=?";
    db.query(sql_email_query,[email],function(err,result){
        if(err) throw err;
        console.log(result);
        if(result.length == 0){
            createNewUser(email,password)
        }
        else{
            res.json("Duplicate Email");
            res.end();
        }
    })

    function createNewUser(email,password){
        var sql_insert_user = "Insert into stockapp.users (email,password) Values (?,?)";
        db.query(sql_insert_user,[email,password],function(err,result){
            if(err) throw err;
            //send confirmation email to users
            emailApi.confirmation_email(email);
            res.json("Unconfirmed User Added");
            res.end()
        }); 
    }

});

app.post('api/getStockInfo',function(req,res){
    var stock_symbol = req.body.stock_to_watch;
    // var info = request('https://finnhub.io/api/v1/quote?symbol='+stock_symbol+'&token=c34391qad3i8edlcgrgg', { json: true }, (err, res, body) => {
    // if (err) { 
    //     console.log('fuck');
    //     return console.log(err); }
    // return res.body;
    // //   console.log(symblol,res.body.c);
    // });
    res.json(info);
});
// app.post('/api/loginVerification', function(req, res){
//     var sql_query = "SELECT * FROM stockapp.users WHERE email =?";
//     var email = req.body.email;
//     console.log(email);
//     db.query(sql_query,[email],function(err,result){
//         if(err){
//             console.log("Error at query");
//             throw err;}
            
//         if (result[0].length == 0 ){
//             console.log("No User By That Email");
//             res.json("No User By That Email")
//             res.end()
//         }

//         else{
//             console.log('line 81');
//         // console.log(result[0],'Found User');
//         res.json(result[0]);
//         res.end();
//         return res.json();
//         }
//     });
// })

app.listen(process.env.PORT || 5000);