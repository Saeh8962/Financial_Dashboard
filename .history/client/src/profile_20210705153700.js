import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import DrawerContainer from "./layout/DrawerContainer";
import Dashboard from "./Dashboard";
// import "./CSS/GlobalCSS.css";
import SearchBar from './panels/InfoPanel'
// import 'react-dropdown/style.css';
// import "./CSS/legacyStyles.css";

import { render } from "react-dom";

class Profile extends Component { 
    
    constructor(props){
        super(props);
        
        
        this.routeChange = this.routeChange.bind(this);
        
             
        if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
            this.props.history.push("/error");
            }
        else{
            this.state={  
                email: this.props.location.state[0][0].email ,
                stocks: this.props.location.state[1],
                stock_to_watch:"",
                dropdownOpen: false,
                value:"Your Watchlist"
                
            };
        }
           
        
    }
    
 
    
    


routeChange(value){
    if (value.target.id=="Back"){
        this.props.history.push("/",this.props.history.location.state);
    }
    else if(value.target.id=="Home"){
        this.props.history.push("/",this.props.history.location.state);
    }
}





render(){

    // var loginButton = <Button onClick={this.routeChange} className= "Button" id = "Home" >Home </Button>;
    return(
        
        <DrawerContainer>
     <div className="page-container">
       <SearchBar stocks= {this.state.stocks} />
     </div>
   </DrawerContainer>
    )
    }


}
export default withRouter(Profile);