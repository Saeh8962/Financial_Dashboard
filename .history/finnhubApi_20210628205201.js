
const finnhub = require('finnhub');
var request = require('request');
const WebSocket = require('ws');
// const WebSocket= require('websocket').request;


const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c34391qad3i8edlcgrgg" 
//const express = require("express")
//var app = express();




function createWebSocket(){
     
    return new WebSocket('wss://ws.finnhub.io?token=c34391qad3i8edlcgrgg');
}

    
    

async function getLiveTrade(symbols){
    var price_status = false;

        // Create a new WebSocket.
        const socket = createWebSocket();


        // Handle any errors that occur.
        socket.onerror = function(error) {
            console.log('WebSocket Error: ' + error);
        };
        // Show a disconnected message when the WebSocket is closed.
            socket.onclose = function(event) {
                console.log("console has closed");
                // socketStatus.innerHTML = 'Disconnected from WebSocket.';
                // socketStatus.className = 'closed';
            };

        // Connection opened -> Subscribe
        await socket.addEventListener('open', async function (event) {
        // socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
        // socketStatus.className = 'open';
        Object.values(symbols.symbol).forEach(symbol=>socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol.name})))
      
            await socket.addEventListener('message', async function  (event,result) {
                if(price_status){
                    socket.close();
                    price_status=!price_status;}
                
                if(!price_status){
                    dataOBJ =JSON.parse(event.data);
                   
                    if(dataOBJ.type==="trade"){ 
                        sortData_toSymbols(symbols,dataOBJ.data);}
                }
            });
            
    });
    async function sortData_toSymbols(symbols,data){
    
        Object.values(symbols.symbol).forEach(symbol=>{
            var tradePrice= data.filter((i,n)=>i.s===symbol.name);
            if(tradePrice.length !=0){
                
                symbol.price = tradePrice[tradePrice.length-1].p; 
                
                socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.name}))
                
                
            }
        });
        var check = Object.values(symbols.symbol).filter((symbol)=>symbol.price == -1);
        if(check.length ===0){
            console.log("All prices caught",symbols);
            price_status = true;
        }
    
    };
}


module.exports ={getLiveTrade,createWebSocket};