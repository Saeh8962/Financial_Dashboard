
const request = require('request');
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c34391qad3i8edlcgrgg" // Replace this
const finnhubClient = new finnhub.DefaultApi()
// request('https://finnhub.io/api/v1/quote?symbol=AAPL&token=c34391qad3i8edlcgrgg', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
// //   console.log(body.url);
//   console.log(res.body.c);
// //   console.log(body.explanation);
// });

//Quote
var x;
finnhubClient.quote("AAPL", (error, data, response) => {
    console.log(data)
    x = data;
});
console.log(f.json());
// getStockQoute('AAPL');
// module.exports = {getStockQoute};