import React,{Component} from "react";
import {ListGroup} from "react-bootstrap";
import {Button} from "reactstrap";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

// import "./CSS/legacyStyles.css";

import { render } from "react-dom";

class Profile extends Component { 
    constructor(props){
        super(props);
        
    }


render(){
    // this.props.history.push("/error",this.state)
    return (
        
        <>
<ListGroup>
  <ListGroup.Item>Cras justo odio</ListGroup.Item>
  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
</ListGroup>
        </>
      );
    }
}
export default withRouter(Profile);