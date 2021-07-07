
// r = request.post('https://finnhub.io/api/v1/webhook/add?token=c34391qad3i8edlcgrgg', json={'event': 'earnings', 'symbol': 'AAPL'})
// res = r.json();
// console.log(res);

// webhook_id = res['id']
// // # List webhook
// r = request.get('https://finnhub.io/api/v1/webhook/list?token=c34391qad3i8edlcgrgg')
// res = r.json()
// console.log(res)
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
finnhubClient.quote("AAPL", (error, data, response) => {
    console.log(data)
});

// getStockQoute('AAPL');
// module.exports = {getStockQoute};