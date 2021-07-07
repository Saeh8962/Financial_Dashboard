
const finnhub = require('finnhub');
var request = require('request');
const WebSocket = require('ws');
// const WebSocket= require('websocket').request;
const socket = new WebSocket('wss://ws.finnhub.io?token=c34391qad3i8edlcgrgg');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c34391qad3i8edlcgrgg" 
const express = require("express")
var app = express();



// Connection opened -> Subscribe
var subscribe = function(symbols){
    socket.addEventListener('open', function (event) {
        symbols.forEach(symbol=>socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol})))
    });
}
//Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}


// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});


function getStockQoute(stockSymblol,callback){
    var finnhubClient = new finnhub.DefaultApi();
    finnhubClient.quote(stockSymblol,(error, data, response)=>{
        callback(data);
    });
}
//#Delete webhook
var deleteWebhook = function(){
    requests.post('https://finnhub.io/api/v1/webhook/delete?token=c34391qad3i8edlcgrgg')
}

subscribe([["ETH"]]);
unsubscribe('ETH');

// function print(data){
//     console.log(data);
// }

// getStockQoute("AAPL",print);
module.exports ={getStockQoute,subscribe,unsubscribe,deleteWebhook};