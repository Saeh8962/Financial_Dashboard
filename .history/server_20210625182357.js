const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const emailApi = require('./email.js')
const stockApi = require('./finnhubApi.js');
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


 



// app.post('/api/getStockInfo', function(req, res){
//     var stock_symbol = req.body.stock_to_watch;
    
    
    
        
    
// })
app.post('/api/AddUserStocks',function(req, res){
    var email = req.body.email;
    var addStock= req.body.addStock;

    //check is stock already in stock table
    var sql_Stock_check = 'SELECT * FROM stock_app.stocks where Symbol = ?';
    db.query(sql_Stock_check,[addStock],function(err,result){
        if(err){
            console.log('Error at query',err);
            throw err;
        }
        if(result.length===0){
            InsertNewStock(addStock)
        }
        else{
            InsertUserStock(email,addStock,function(ret){
                res.json(ret);
                res.end();
            });
        }
    })
    
    //insert new stock into stock table if not added already 
    function InsertNewStock(symbol){
        stockApi.getStockQoute(symbol,function(ret){
            
        var sql_new_stock = 'INSERT INTO stock_app.stocks VALUES (?,?,?,?,?,?)';
        db.query(sql_new_stock,[symbol,ret.o,ret.h,ret.l,ret.c,ret.pc],function(err,result){
            if(err){
                console.log('Error at query stock Insert',err);
                throw err;
            }
            else{
                InsertUserStock(email,addStock,function(ret){
                    res.json(ret);
                    res.end();
                });
            }
        })
    });
    }
    //insert stock in user_stocks table if not already added.
    function InsertUserStock(email,symbol,callback){
        var sql_already_added_check= 'SELECT * FROM stock_app.user_stocks WHERE Uemail =? and symbol = ?';
        db.query(sql_already_added_check,[email,addStock],function(err,result){
            if(err){
                console.log('Error at sql_already_added_checkt',err);
                throw err;}

            if(result.length !==0){callback('User had already added this stock')}
            
            else{
                var sql_UserStock_Insert = 'INSERT INTO stock_app.user_stocks VALUES (?,?)';

                db.query(sql_UserStock_Insert,[email,addStock],function(err,result){
                    if(err){
                        console.log('Error at query user stock Insert',err);
                        throw err;
                    }
                    else{callback("Successfully Updated");}
                });
            }
        })
       
    }
    
})
app.post('/api/getStockQoute',function(req, res){
    var stock = req.body.stockApi;
    var sql_stockInfo =' SELECT * from stock_app.stocks where Symbol = ?';
    db.query(sql_stockInfo,[stock],function(err,result){
        if(err)throw err;
        if(result.length === 0){
            res.json("no stock information for stock"+stock)
            res.end();

        }
        else{
            console.log("stockQoute...")
            res.json(result)
            res.end();
        }
    })

})
app.post('/api/removeUserStock',function(req, res){
    var email = req.body.email;
    var stock_to_remove = req.body.stock_symbol;
    var sql_delete_query ='delete from stock_app.user_stocks where Uemail = ? and symbol = ?';

    db.query(sql_delete_query,[email,stock_to_remove],function(err,result){
        if(err) throw err;
        if(result.length ===0){
            res.json("Stock not on watch list");
            res.end()
        }
        else{
            console.log("Sucessfully removed stock");
            res.json("Sucessfully removed stock");
            res.end();
        }
    })
    
    
})

app.post('/api/getUserStocks',function(req,res){
    var email = req.body.email;
    console.log('finding stocks for ',email);
    var sql_query = "SELECT symbol FROM stock_app.user_stocks WHERE Uemail = ?";
    db.query(sql_query,[email],function(err,result){
        if(err){
            console.log('Error at query',err);
            throw err;
        }
        if(result.length === 0){
            console.log("User has no stocks added");
            res.json("No stocks added")
            res.end();

        }
        else{
            console.log('users stocks list',result);
            res.json(result);
            res.end();
            return res.json
        }
    })

})

app.post('/api/loginVerification', function(req, res){
    var sql_query = "SELECT * FROM stock_app.users WHERE email =?";
    var email = req.body.email;
    console.log(email);
    db.query(sql_query,[email],function(err,result){
        console.log(result);
        if(err){
            console.log("Error at query");
            throw err;}
            
        if (result.length === 0 ){
            console.log("No User By That Email");
            res.json("No User By That Email")
            res.end()
        }

        else{
        console.log(result[0],'line 132')
        res.json(result[0]);
        res.end();
       
        }
    });
})
const port = 5000;

app.listen(port,()=> console.log("port 5000"));
// if(app.address().port != PORT){
//     console.log(app.address().port);
//     app.listen(app.address().port);
// }

    