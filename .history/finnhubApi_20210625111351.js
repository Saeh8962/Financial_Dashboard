
const finnhub = require('finnhub');
var request = require('request');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c34391qad3i8edlcgrgg" 
const express = require("express")
var app = express();

function getStockQoute(stockSymblol,callback){
    var finnhubClient = new finnhub.DefaultApi();
    finnhubClient.quote(stockSymblol,(error, data, response)=>{
        callback(data);
    });
}

module.exports = {getStockQoute};