var request = require('request');
const express = require("express")
var app = express();

var apiKey='c34391qad3i8edlcgrgg';
var sandbox_apiKey='sandbox_c34391qad3i8edlcgrh0';

r = requests.post('https://finnhub.io/api/v1/webhook/add?token=c34391qad3i8edlcgrgg', json={'event': 'earnings', 'symbol': 'AAPL'})
res = r.json()
print(res)