const url ="http://api.marketstack.com/v1/eod?access_key = YOUR_ACCESS_KEY & symbols = AAP& date_from = 2020-07-10& date_to = 2021-07-02";

function stockHistory(symbol){
    var user={ 
        stock: symbol,
    }
    console.log(user);
    
    const req = new Request(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user),
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
