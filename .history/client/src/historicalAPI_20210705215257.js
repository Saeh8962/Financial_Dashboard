const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02";


const fetch = require("node-fetch");

const request = require('request');

request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(res.body);
  
});    
        
       
function stockHistory(){
    
   
    
    const req = new Request(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        
    });
    fetch(req)
    .then((res)=>{
       
        return res.json();
    }).catch((error)=>{
        console.log(error);
        return Promise.reject(error);
        })
    .then(stock_results => {
        console.log("History API returned: ", stock_results);

        }); 
}
// stockHistory();