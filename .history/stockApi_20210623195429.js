
const request = require('request')
const express = require("express")
var app = express();

var apiKey='c34391qad3i8edlcgrgg';
var sandbox_apiKey='sandbox_c34391qad3i8edlcgrh0';

// r = request.post('https://finnhub.io/api/v1/webhook/add?token=c34391qad3i8edlcgrgg', json={'event': 'earnings', 'symbol': 'AAPL'})
// res = r.json();
// console.log(res);

// webhook_id = res['id']
// // # List webhook
// r = request.get('https://finnhub.io/api/v1/webhook/list?token=c34391qad3i8edlcgrgg')
// res = r.json()
// console.log(res)
r = request.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=c34391qad3i8edlcgrgg')
print(r.json())