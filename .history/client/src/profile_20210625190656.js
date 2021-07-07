import React,{Component} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";
// import 'react-dropdown/style.css';
// import "./CSS/legacyStyles.css";

import { render } from "react-dom";

class Profile extends Component { 
    constructor(props){
        super(props);
        
        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUserStocks= this.getUserStocks.bind(this);
        this.UpdateStockOnPage= this.UpdateStockOnPage.bind(this);
        this.addUserStock = this.addUserStock.bind(this);
        this.updatePage= this.updatePage.bind(this);
        this.removeStock= this.removeStock.bind(this);
        this.stockQoute = this.stockQoute.bind(this);
        // this.handleInfo= this.handleInfo.bind(this);
        this.toggle = this.toggle.bind(this);
        // if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
        //     this.props.history.push("/error");
        // }
        // else{

            this.state={  
                email: this.props.location.state[0][0].email ,
                stocks: this.props.location.state[1],
                stock_to_watch:"",
                dropdownOpen: false,
                value:"Your Watchlist"


            };
           
        // }
    }
    
    toggle(event) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          value: event.currentTarget.textContent
        });
      }

      handleChange(event) {
         
        this.setState({stock_to_watch: event.target.value});
      }
    // getStockInfo(){
    //     // if(this.state.email!=null){
    //     console.log(this.state.stock_to_watch)
    //     var user={
    //         email:this.state.email,
    //         stock_to_watch: this.state.stock_to_watch,
    //     } 
       
    //     var url="/api/getStockInfo";
    //     const req = new Request(url,{
    //         method:"POST",
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(user),
    //     });
    //     fetch(req)
    //     .then((res)=>{
    //         //Catch server error
    //             //no error
    //         // console.log(res);
    //         return res.json();
    //     })
    //     .then(api_result=>{
    //         console.log(api_result);
    //         this.handleInfo(api_result);
            
            
    //     }) 
    //     .catch((error)=>{
    //         console.log("error line 77");
    //         return Promise.reject(error);
    //     });
        
    // }
    // handleInfo(Info){
    //     this.setState({stocks:Info})
        
    // }

    


routeChange(value){
    if (value.target.id=="Back"){
        this.props.history.push("/",this.props.history.location.state);
    }
    else if(value.target.id=="Home"){
        this.props.history.push("/home",this.props.history.location.state);
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
        return res.json();
    })
    .then(query_result => this.setState({query:[[{email:this.state.email}],query_result]},()=> this.updatePage()))
    .catch((error)=>{
        return Promise.reject(error);
        });
}

updatePage(){
    this.props.history.push("/profile",this.state.query)
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
        alert("artist not found");
    }
    
    
}
removeHelper(){
    if(this.state.remove_status==="Stock not on watch list"){
        alert("Artist Queued For Deletion, Please Login In Again");
    }
    else if(this.state.remove_status==="Sucessfully removed stock "){
        this.setState({remove_status:""},()=>this.getUserStocks());
    }
}

removeStock(htmlEvent,stock){
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
stockQoute(stock){
    var user={
        email:this.state.email,
        stock_symbol: stock,

    } 
    var url = '/api/getStockQoute';
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
      .then((result)=> this.setState({currentPrice:result.c}));

}


render(){
    // this.getUserStock(this.state.email,this.handleInfo);

    if (this.state == null || this.state.email == null ){
        this.props.history.push("/error");
        }
    
  
    var Message = "Your WatchList";
    var MessageArrowDir;
    if(this.state.dropdownOpen){
      MessageArrowDir = "\u25BC";
    }

    else{
      MessageArrowDir = "\u25B2";
    }
    var dropdownDisplay =
        <> <div className = "dropDiv">
            <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>

            <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
                    data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>

        </div></>
    
    var dropdown =

    <Dropdown style = {{marginBottom:"10px"}} isOpen={this.state.dropdownOpen}>
        {dropdownDisplay}

        <DropdownMenu className = "DDM">
          <div className = "ArtistsDisplayWrapper">
            {this.state.stocks.map((stocks,index) =>
            
		<div className = "ArtistLine" style = {{marginBottom:"25px"}}>
            {this.stockQoute(stocks.symbol)}
			<button id = {stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{stocks.symbol}</button>
			<button onClick = {(e)=>{this.doNothing(e)}} className = "playArtistButton">{this.state.currentPrice}</button>
			<button onClick = {(e)=>{this.removeStock(e,stocks.symbol)}} className = "removeButton">X</button> 
		</div>
            )}
          </div>
        </DropdownMenu>
    </Dropdown>

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
          {dropdown}

      

          <div style = {{fontSize:12},{marginTop:"20px"},{marginBottom:"20px"}}>An email will be sent to you at the email above when your artist releases new music.</div> 

        </form>

      </div>
        </>
      );
    }
}
export default withRouter(Profile);