import React,{Component} from "react";
import {Button} from "reactstrap";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

// import "./CSS/legacyStyles.css";

import { render } from "react-dom";

class Profile extends Component { 
    constructor(props){
        super(props);

        if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
            this.props.history.push("/error");
        }
        else{
            this.state={   
                email:this.props.location.state[0][0]
            };
        }
    }


render(){
    this.props.history.push("/error",this.state)
    return (
        
        <>
        </>
      );
    }
}
export default withRouter(Profile);