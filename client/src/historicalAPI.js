const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02&limit=500";




const request = require('request');


request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  
});    
        
       

// stockHistory();