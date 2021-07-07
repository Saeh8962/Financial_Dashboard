import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

class watchList extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            stocks:{}
        }
    }
 
    render(){
       
        console.log("In render: ", this.state.stocks);
        if (this.state == null){
            this.props.history.push("/error");
            }
        
        
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
        
        var dropdownDisplay =
            <> <div className = "dropDiv">
                <Button className = "FakeDropDown" onClick = {(e)=>{this.doNothing(e)}}><span style={{marginLeft:"55px"}}>{Message}</span></Button>
    
                <Button className = "realDropDown "onClick = {this.toggle} aria-expanded = {this.state.dropdownOpen}
                        data-toggle = "dropdown" aria-haspopup="true"><span style={{fontSize:"18px"}}>{MessageArrowDir}</span></Button>
    
            </div></>
        var dropdown;
        if(this.state.stocks!=="No stocks added"){
    
        dropdown = 
    
        <Dropdown style = {{marginBottom:"20px"}} isOpen={this.state.dropdownOpen}>
            {dropdownDisplay}
    
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
        }
        else{
            dropdown = dropdownDisplay;
    
           
      
        }
       
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
    
          
    
              {/* <div style = {{fontSize:12},{marginTop:"20px"},{marginBottom:"20px"}}>An email will be sent to you at the email above when your artist releases new music.</div>  */}
    
            </form>
    
          </div>
            </>
          );
        }
}
