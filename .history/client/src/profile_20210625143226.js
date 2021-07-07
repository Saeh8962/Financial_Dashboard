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
        console.log(this.props.location.state[0][0].email);
        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUserStock= this.getUserStock.bind(this);
        this.handleInfo= this.handleInfo.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getUserStock = this.getUserStock.bind(this);
        // if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
        //     this.props.history.push("/error");
        // }
        // else{

            this.state={   
                stock_to_watch:"",
                dropdownOpen: false,


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
    handleInfo(Info){
        this.setState({stocks:Info})
        
    }

    


routeChange(value){
    if (value.target.id=="Back"){
        this.props.history.push("/",this.props.history.location.state);
    }
    else if(value.target.id=="Home"){
        this.props.history.push("/home",this.props.history.location.state);
    }
}
getUserStock(Email,callback){
    var user={
        email:Email,
    } 
   
    var url="/api/getUserStocks";
    const req = new Request(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user),
    });
    fetch(req)
    .then((res)=>{
        //Catch server error
            //no error
        // console.log(res);
        return res.json();
    })
    .then(api_result=>{
        console.log(api_result);
        this.handleInfo(api_result);
        
        
    }) 
    .catch((error)=>{
        console.log("error line 77");
        return Promise.reject(error);
    });
}


render(){
    // this.getUserStock(this.state.email,this.handleInfo);
    console.log(this.state.email);
    if (this.state == null || this.state.email == null ){
        this.props.history.push("/error");
        }
    
  
    // var Message = "Your WatchList";
    // var MessageArrowDir;
    // if(this.state.dropdownOpen){
    //   MessageArrowDir = "\u25BC";
    // }

    // else{
    //   MessageArrowDir = "\u25B2";
    // }
    // var dropdownDisplay =
    //     <> <div className = "dropDiv">
    //         <Button className = "FakeDropDown" onClick = {(e)=>e.preventDefault()}><span style={{marginLeft:"55px"}}>{Message}</span></Button>

    //         <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
    //                 data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>

    //     </div></>

    // var dropdown =

    // <Dropdown style = {{marginBottom:"10px"}} isOpen={this.state.dropdownOpen}>
    //     {dropdownDisplay}

    //     <DropdownMenu className = "DDM">
    //       <div className = "ArtistsDisplayWrapper">
    //         {/* {this.state.stocks.map((stocks,index) => */}
	// 	<div className = "ArtistLine" style = {{marginBottom:"25px"}}>
	// 		<button id = {this.state.stocks.symbol} onClick = {(e)=>{this.doNothing(e)}} className = "artistButton">{this.state.stocks.symbol} ${this.state.stocks.stockInfo.c}</button>
	// 		{/* <button onClick = {(e)=>{this.playSample(e,artists.aid)}} className = "playArtistButton">{"\u25B6"}</button>
	// 		<button onClick = {(e)=>{this.beginRemove(e,artists.artist_name)}} className = "removeButton">X</button> */}
	// 	</div>
    //         {/* )} */}
    //       </div>
    //     </DropdownMenu>
    // </Dropdown>
    var trackButton = <Button onClick = {this.getStockInfo} className= "Button" id = "TrackButton" >Track </Button>;

    // this.props.history.push("/error",this.state)
    return (
        
        <>
<div className = "ALL">

        <div className= "HeaderInfo" id="ProfileInfo">
          Hey! {this.state.email}<br></br>
        </div>

        <form className= "FormFields">
          <div className="FormField">
            <input onChange={this.handleChange} className= "FormField_Input" placeholder= "Stock Name" type="text" name="artist" />
          </div>
          {trackButton}
          {/* {dropdown} */}

          {/* {CurrentSong} */}

          {/* <div style = {{fontSize:12},{marginTop:"20px"},{marginBottom:"20px"}}>An email will be sent to you at the email above when your artist releases new music.</div> */}

        </form>

      </div>
        </>
      );
    }
}
export default withRouter(Profile);