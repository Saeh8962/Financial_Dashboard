import React,{Component} from "react";
import {Button} from "s";
import {withRouter} from "react-router-dom";
import "./CSS/GlobalCSS.css";

const bcrypt = require('bcrypt-nodejs');

class signUp extends Component{
    constructor(props){
        super(props);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleEmail=this.handleEmail.bind(this);
        this.routeChange=this.routeChange.bind(this);
        this.test=this.test.bind(this);
        this.state={
            password:"",
            email:""
        }
    }

    handleEmail(event){
        this.setState({email: event.target.value});
    }

    handlePassword(event){
        this.setState({password: event.target.value});
    }

    // Handle to new Brower path
    routeChange(value){
        if (value.target.id === "back"){
            this.props.history.push("/",this.props.history.location.state);
          }
    
          else if(value.target.id=="Home"){
            this.props.history.push("/home",this.props.history.location.state);
          }
    }

    //Test the users email and password input

    test(){
        //used to check if the password has 7-15 characts and contrains at least one numeric dogot and a special character
        var secureCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(this.state.password.match(secureCheck)){
            var user={
                email:this.state.email,
                password:bcrypt.hashSync(this.state.password)
            }
            
            console.log(user);

            var url="/api/signup";
            const req = new Request(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user),

            });
            fetch(req)
            .then((res)=>{
                //Catch server error
                    //no error
                    return res.json();
                }).catch((error)=>{
                    console.log(error);
                    return Promise.reject(error);
                })
            .then(query_result => this.setState({query:[[{email:this.state.email}],[]],SignStatus:query_result},()=> console.log(query_result)))
            .then(()=>{
                if (this.state.SignStatus === "Unconfirmed User Added"){
                    this.props.history.push("/confirmEmail");
                }
                else if (this.state.SignStatus === "Duplicate Email"){
                    this.setState.SignStatus = "";
                    alert("Email Is Currently In Use")
                }
                
            });

        }
        else{
            alert("Password must have 7 to 15 characters and contain at least one numeric digit and a special character");
           }

    }

    render(){
        console.log("Sign Status",this.state.SignStatus)

        //email has not been confirmed yet 
        // if (this.state.SignStatus === "Unconfirmed User Added"){
        //     this.props.history.push("/confirmEmail");
        // }
        //email submitted is already in the database
        // else if (this.state.SignStatus === "Duplicate Email"){
        //     this.setState.SignStatus = "";
        //     alert("Email Is Currently In Use")
        // }
        var color = "white";
        //if password is empy set the box to white
        if(this.state.password === null || this.state.password.length === 0){
            color = "white";
        }
        //if password matches the constraints set the box to green
        else if(this.state.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)){
            color = "green";
          }
        //otherwise the password is not valid so set the box to red
        else{
            color = "red"
          }

        var styleAttr = {borderBottom:"2px solid "+color}
        var leftarrow = "\u2190"

        var passwordInput = <input style = {styleAttr} onChange={this.handlePassword} className= "FormField-Input_Ls" placeholder= "Create a Password" type="Password" name="Password" />
        var emailInput = <input onChange={this.handleEmail} className= "FormField_Input_LS" placeholder="Email" type="text" name="Email"/>
        var backButton = <Button className="Button" id= "back" onClick={this.routeChange}>{leftarrow}</Button>
        var signUpButton = <Button onClick={this.test} className= "Button" id="SignupButton">Create Account</Button>
        return(
                
    <div className= "CenterWrapper">

        <div className= "HeaderInfo" id="TitleTextSignUp">
        Sign Up!
        </div>

        <div className = "FormWrap">
        
            <div className="FormField">
                {emailInput}
            </div>
            
            <div className="FormField">
                {passwordInput}
            </div>

            {backButton}
            {signUpButton}

        </div>
    </div>
        
        );
    }

}
export default withRouter(signUp);