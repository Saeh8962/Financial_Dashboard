import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
// import App from './App';
import Home from './home';
import SignUp from './signUp';
// import confirmEmail from './confirmEmail';
import Login from './login';
// import Profile from './profile';
import Error from './error';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route} from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
  <Route exact path ="/" component = {Home}/>
  <Route exact path ="/signUp" component = {SignUp}/>
  {/* <Route exact path="/confirmEmail" component={confirmEmail}/>  */}
  <Route exact path="/login" component={Login}/>
  <Route exact path="/error" component={Error}/>
  {/* <Route exact path="/profile" component={Profile}/>  */}
  </BrowserRouter>,
    
  document.getElementById('root')
);
