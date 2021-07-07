import React,{Component,ChildComponent} from "react";
import {ListGroup} from "react-bootstrap/esm";
import {Button,DropdownMenu,Dropdown} from "reactstrap/es";
import {withRouter} from "react-router-dom";
import DrawerContainer from "./layout/DrawerContainer";

import "./CSS/GlobalCSS.css";
import "./CSS/App.css";
import './App.scss';
import SearchBar from './components/searchbar'
import WatchList from './components/WatchList'
import AllocationPanel from "./panels/AllocationPanel";
import PerformancePanel from "./panels/PerformancePanel";
// import 'react-dropdown/style.css';
// import "./CSS/legacyStyles.css";

// import { render } from "react-dom";

class Profile extends Component { 
    
    constructor(props){
        super(props);
        
        
        this.routeChange = this.routeChange.bind(this);
        
             
        if(this.props.location.state == null || this.props.location.state[0] == null || this.props.location.state[0][0] == null || this.props.location.state[1] == null){
            this.props.history.push("/error");
            }
        else{
            if(this.props.location.state[0][0].chartStock !== null)
            this.state={  
                email: this.props.location.state[0][0].email ,
                stocks: this.props.location.state[1],
                stock_to_watch:"",
                dropdownOpen: false,
                value:"Your Watchlist",
                Chart_stock:this.props.location.state[0][0].chartStock
                
            }
            else{
                this.state={  
                    email: this.props.location.state[0][0].email ,
                    stocks: this.props.location.state[1],
                    stock_to_watch:"",
                    dropdownOpen: false,
                    value:"Your Watchlist",
                    
                    
                } 
            }
        }
           
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.state[0][0].getStocks !==this.props.location.state[0][0].getStocks) {
          console.log('User has added a stock. Get new stocks')
          this.getUserStocks()
          
        }
        if (prevProps.location.state[0][0].removeStocks !== this.props.location.state[0][0].RemoveStocks) {
            console.log('User has Removed a stock. Get new stocks')
            this.getUserStocks()
            
          }
          if (prevProps.location.state[0][0].chartStock !== this.props.location.state[0][0].chartStock) {
            console.log('User has chosen a chart to display')
            this.setState({Chart_stock:this.props.location.state[0][0].Chart_stock},()=>this.forceUpdate)
        
            
          }
        
      }

      getUserStocks(){
  
        var user={ 
            email: this.state.email,
        }
        console.log(user);
        var url = "/api/getUserStocks";
        const req = new Request(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        });
        fetch(req)
        .then((res)=>{
           
            return res.json();
        }).catch((error)=>{
            console.log("p/121");
            console.log(error);
            return Promise.reject(error);
            })
        .then(stock_results => {
            console.log("3rdt ADD/remove Stock Rerender");
            this.setState({stocks:stock_results},()=> this.props.history.push("/profile",[[{email:this.state.email},this.state.stocks]]))});
        
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
    console.log(this.state.Chart_stock)
    // var loginButton = <Button onClick={this.routeChange} className= "Button" id = "Home" >Home </Button>;
    return(
        
        <DrawerContainer>
            <div className="App-header">
            <div className="panels">
                <div className="panel-info">
                <SearchBar stocks= {this.state.stocks} email= {this.state.email} /> 
                </div>
                <div className="panel-allocation">
                    <AllocationPanel/>
                </div>
                <div className="panel-balance">
                    <PerformancePanel symbol={this.state.Chart_stock}/>
                </div>
                <div className="panel-positions">
                <WatchList stocks={this.state.stocks}email= {this.state.email}/>
                </div>
        </div>
            </div>
            
   </DrawerContainer>
    )
    }


}
export default withRouter(Profile);