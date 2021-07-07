const url ="http://api.marketstack.com/v1/eod?access_key=YOUR_ACCESS_KEY&symbols&AAP&date_from=2020-07-10& date_to=2021-07-02";
const Request = require("request")

const fetch = require("node-fetch");

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
stockHistory();