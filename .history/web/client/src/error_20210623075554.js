import React,{Component} from "react";
import {Button} from "reactstrap";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

class error extends Component {
  constructor(props){
    super(props);
  this.handleRouteChange = this.handleRouteChange.bind(this);
}

handleRouteChange(event){
	console.log(event.target);
	if(event.target.id === "Home"){
		this.props.history.push("/");
	}
}

  render(){
    return(
    <>
	<div className= "HeaderInfo">Woah There!</div>
	<div className= "HeaderInfo">Something went wrong. Try logging in again.</div>
	<br></br>
	<button id = "Home" className = "Button" onClick = {this.handleRouteChange}>Home</button>
    </>
    );
  }

}
export default withRouter(error);
