import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

class watchList extends React.Component {

    constructor(props) {
        super(props)
        this.saveNewStockTrade=this.saveNewStockTrade.bind(this);
        this.getUserStocks= this.getUserStocks.bind(this);
        this.UpdateStockOnPage= this.UpdateStockOnPage.bind(this);
        this.addUserStock = this.addUserStock.bind(this);
        this.updateDropdown=this.updateDropdown.bind(this);
        this.handleChange=this.handleChange.bind(this);
        // this.updatePage= this.updatePage.bind(this);
        this.removeStock= this.removeStock.bind(this);
        // this.UpdateStockOnPageRemove=this.UpdateStockOnPageRemove.bind(this); 
        this.toggle=this.toggle.bind(this);
       
            this.state={
                
                dropdownDisplay : this.updateDropdown,
                connectionError: false,
                dropdownOpen: false,
                value:"Your Watchlist"
            }
        
        
    }
    componentWillUnmount(){
    
        this.ws.close();
        // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, 
        // or cleaning up any subscriptions that were created in componentDidMount().
    }
    toggle(event) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          value: event.currentTarget.textContent
        });
      }
    saveNewStockTrade= (event) => {
        let result = JSON.parse(event.data)
        let user_watchlist = this.state.stocks

        if(result.type==="trade"){
            user_watchlist.forEach(symbol => {
                var tradePrice= result.data.filter((i,n)=>i.s===symbol.Symbol);
                if(tradePrice.length !==0){
                    symbol.currentPrice = tradePrice[tradePrice.length-1].p; 
                    console.log("Found Updated price for ",symbol.Symbol)
                    // socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': symbol.name}))
                }
            })
            
        }
        this.setState({stocks:user_watchlist},()=>this.updateDropdown);
    }
     
    componentDidMount(){
        this.connection = new WebSocket('wss://ws.finnhub.io?token=c34391qad3i8edlcgrgg');
        this.connection.onopen = ()=> { 
            if (this.state.stocks!=="No stocks added"){
                this.state.stocks.forEach(symbol=>{
                    this.ws.send(JSON.stringify({'type':'subscribe', 'symbol': symbol.Symbol}));
                    console.log("Inside OnOpen: Subscribed To: ", symbol.Symbol)
                })
            }
            else{
                console.log("no stocks added to subscribe to");
            }
            
        }
        this.connection.onmessage= this.saveNewStockTrade;
        this.connection.onclose = () => { this.setState({connectionError: true}) }
    }
    
    updateDropdown(){
        var Message = "Your WatchList";
        if(this.state.stocks==="No stocks added"){
            Message ="Empty Watchlist"; 
        }
        var MessageArrowDir;
        if(this.state.dropdownOpen){
          MessageArrowDir = "\u25BC";
        }
    
        else{
          MessageArrowDir = "\u25B2";
        }
        
        var header =
            <> <div className = "dropDiv">
                <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>
    
                <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
                        data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>
    
            </div></>
        
        if(this.state.stocks!=="No stocks added"){
        var display = 
        <Dropdown style = {{marginBottom:"20px"}} isOpen={this.state.dropdownOpen}>
            {header}
    
            <DropdownMenu className = "DDM">
              <div className = "ArtistsDisplayWrapper">
                {this.state.stocks.map((stocks,index) =>
                
            <div className = "ArtistLine" style = {{marginBottom:"55px"}}>
                
                <button  onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{stocks.Symbol}</button>
                <button id = {stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "playArtistButton">${stocks.currentPrice}</button>
                <button onClick = {(e)=>{this.removeStock(e,stocks.Symbol)}} className = "removeButton">X</button> 
            </div>
                )}
              </div>
            </DropdownMenu>
        </Dropdown>
        this.setState({dropdownDisplay:display});
                }
                else{
                    this.setState({dropdownDisplay:header});
                }
        

    }
   
    removeStock(htmlEvent,stock){
        //unsubsribe from listening to thsi stock
        this.ws.send(JSON.stringify({'type':'unsubscribe', 'symbol': stock}))
        //first stop the htmlEvents default status
        htmlEvent.preventDefault();
        var user={
            email:this.state.email,
            stock_symbol: stock,
    
        } 
        var url = '/api/removeUserStock';
        const req = new Request(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        });
        fetch(req)
        .then((res)=>{
            return res.json();
        }).catch((error)=>{
            return Promise.reject(error);
          })
          .then((result)=> this.setState({remove_status:result},()=>this.removeHelper()));
    
    }
    
    removeHelper(){
        console.log("p/179",this.state.remove_status);
        //removed but still showing on watch list
        if(this.state.remove_status==="Stock not on watch list"){
            alert("Stock Queued For Deletion, Please Login In Again");
        }
        //stock has been removed from watchlist
        else if(this.state.remove_status[0]==="Sucessfully removed stock"){
            console.log("p/212");
            this.setState({stocks:this.state.remove_status[1]},()=> this.updateDropdown);
        }
    }
    getUserStocks(){
        var user={ 
            email: this.state.email,
        }
        var url = "/api/getUserStocks";
        const req = new Request(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        });
        fetch(req)
        .then((res)=>{
            console.log("p/87");
            return res.json();
        }).catch((error)=>{
            console.log("p/121");
            console.log(error);
            return Promise.reject(error);
            })
        .then(stock_results => this.setState({stocks:stock_results},()=>this.updateDropdown));
        
    }
    
    updatePage(){
        
        
        this.props.history.push("/profile",[[{email:this.state.email}],this.state.stocks])
        
        
        
    }
    
    UpdateStockOnPage(){
        if(this.state.stock_symbol_status === 'User had already added this stock'){
            alert("This stock is already on your watchlist");
        }
        
        else{
            this.setState({stock_symbol_status:"",Remove_Status:""},()=>this.getUserStocks());
        }
    }

    addUserStock(){
        if(this.state.stock_symbol_status !== "stock not found"){
            this.ws.send(JSON.stringify({'type':'subscribe', 'symbol': this.state.stock_to_watch}));
            var user={
                email:this.state.email,
                addStock: this.state.stock_to_watch
            } 
           
            var url="/api/AddUserStocks";
            const req = new Request(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user),
            });
            fetch(req)
            .then((res)=>{
                return res.json();
            }).catch((error)=>{
                return Promise.reject(error);
              })
            .then(result => this.setState({stock_symbol_status: result},()=>this.UpdateStockOnPage()));
            
        }
    
        else{
            //put in this functionality 
            alert("stock not found");
        }
        
        
    }
    handleChange(event) {
         
        this.setState({stock_to_watch: event.target.value});
      }
    
    render(){
       
        console.log("In render: ", this.state.stocks);
        if (this.state == null){
            this.props.history.push("/error");
            }
        
        
        // var Message = "Your WatchList";
        // if(this.state.stocks==="No stocks added"){
        //     Message ="Empty Watchlist"; 
        // }
        // var MessageArrowDir;
        // if(this.state.dropdownOpen){
        //   MessageArrowDir = "\u25BC";
        // }
    
        // else{
        //   MessageArrowDir = "\u25B2";
        // }
        
        // var dropdownDisplay =
        //     <> <div className = "dropDiv">
        //         <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>
    
        //         <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
        //                 data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>
    
        //     </div></>
        // var dropdown;
        // if(this.state.stocks!=="No stocks added"){
    
        // dropdown = 
    
        // <Dropdown style = {{marginBottom:"20px"}} isOpen={this.state.dropdownOpen}>
        //     {dropdownDisplay}
    
        //     <DropdownMenu className = "DDM">
        //       <div className = "ArtistsDisplayWrapper">
        //         {this.state.stocks.map((stocks,index) =>
                
        //     <div className = "ArtistLine" style = {{marginBottom:"55px"}}>
                
        //         <button  onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{stocks.Symbol}</button>
        //         <button id = {stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "playArtistButton">${stocks.currentPrice}</button>
        //         <button onClick = {(e)=>{this.removeStock(e,stocks.Symbol)}} className = "removeButton">X</button> 
        //     </div>
        //         )}
        //       </div>
        //     </DropdownMenu>
        // </Dropdown>
        // }
        // else{
        //     dropdown = dropdownDisplay;
    
           
      
        // }
       
        // var trackButton = <Button onClick = {this.getStockInfo} className= "Button" id = "TrackButton" >Track </Button>;
    
        // this.props.history.push("/error",this.state)
        return (
            
            <>
    <div className = "ALL">
    
            <div className= "HeaderInfo" id="ProfileInfo">
              Hey! {this.state.email}<br></br>
            </div>
    
            <form className= "FormFields">
              <div className="FormField">
                <input onChange={this.handleChange} className= "FormField_Input" placeholder= "Stock Name" type="text" name="stock" />
                <span className = "play"><Button onClick={this.addUserStock} className= "ButtonNoRight" >Track </Button></span> 
              
              </div>
              {/* {trackButton} */}
              {this.dropdownDisplay}
    
          
    
              {/* <div style = {{fontSize:12},{marginTop:"20px"},{marginBottom:"20px"}}>An email will be sent to you at the email above when your artist releases new music.</div>  */}
    
            </form>
    
          </div>
            </>
          );
        }
}
export default withRouter(watchList);