import React,{Component} from "react";
import {Button} from "react-strap";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";
const bcrypt = require('bcrypt-nodejs');

class Home extends Component {
    constructor(props){
      super(props);
      this.routeChange=this.routeChange.bind(this);
      this.state={}
    }
  
    routeChange(value){
      if (value.target.id === "Login"){
          this.props.history.push("/login",this.props.history.location.state);
        }
  
      else if(value.target.id === "Sign Up"){
        this.props.history.push("/signup",this.props.history.location.state);
      }
  
    }
  
    render(){
      return(
        <>
        <div className="HomeCenterWrapper">
  
          <div className= "HomePageHeader" id = "TitleTextSignUp">
            Bull Watch
          </div>
  
          <div className= "HomePagedesc" id = "TitleTextSignUp">
            Know What Is Happening With Your Favorite Stocks!
          </div>
  
          <div className = "buttonsDiv">
            <Button id = "Login"   className = "Button" onClick={this.routeChange}>Login</Button>
            <Button id = "Sign Up" className = "Button" onClick={this.routeChange}>Sign Up</Button>
          </div>
  
        </div>
        </>
      );
    }
  
  }
  export default withRouter(Home);