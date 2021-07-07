const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const emailApi = require('./email.js')
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.timeout = 0;

//open the database

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "My3sons2@4",
  port: 3306
});

db.connect(function(err){
    if(err){
        console.log(err);  
        throw err;
    } 
    console.log("connected!");
  });






  
//   function MinutesToMilleSeconds(min){
//       return min*60*1000;
//   }

  app.post('/api/signup', function(req, res){
    console.log(req.body);
    var email = req.body.email
    var password = req.body.password
    console.log(email,password);
 
    //check if the email is in use, if it is not create the users
    var sql_email_query= "SELECT * FROM stock_app.users WHERE email=?";
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
        var sql_insert_user = "Insert into stock_app.users (email,password) Values (?,?)";
        db.query(sql_insert_user,[email,password],function(err,result){
            if(err) throw err;
            //send confirmation email to users
            emailApi.confirmation_email(email);
            res.json("Unconfirmed User Added");
            res.end()
        }); 
    }

});

// app.post('/api/getStockInfo',function(req,res){
//     
//     console.log("in post request");
//     var info = request('https://finnhub.io/api/v1/quote?symbol='+stock_symbol+'&token=c34391qad3i8edlcgrgg', { json: true }, (err, res, body) => {
//     if (err) { 
//         console.log('fuck');
//         return console.log(err); }
//     return res.body;
//     //   console.log(symblol,res.body.c);
//     });
//     console.log(info);
//     res.json(info);
//     res.end();
//     return res.json();
// })
app.post('/api/getStockInfo', function(req, res){
    var stock_symbol = req.body.stock_to_watch;
    console.log(stock_symbol);
    getStockQoute(stock_symbol);
    
    function getStockQoute(symblol){
        request('https://finnhub.io/api/v1/quote?symbol='+symblol+'&token=c34391qad3i8edlcgrgg', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
              
              console.log(symblol,body);
              return body;
            });
        }
    console.log(info.body);
    res.json("test");
    res.end();
    return res.json();
        
    
})

app.post('/api/loginVerification', function(req, res){
    var sql_query = "SELECT * FROM stock_app.users WHERE email =?";
    var email = req.body.email;
    console.log(email);
    db.query(sql_query,[email],function(err,result){
        if(err){
            console.log("Error at query");
            throw err;}
            
        if (result[0].length == 0 ){
            console.log("No User By That Email");
            res.json("No User By That Email")
            res.end()
        }

        else{
            console.log('line 81');
        // console.log(result[0],'Found User');

        res.json(result[0]);
        res.end();
        return res.json();
        }
    });
})
const port = 5000;

app.listen(port,()=> console.log("port 5000"));
// if(app.address().port != PORT){
//     console.log(app.address().port);
//     app.listen(app.address().port);
// }
