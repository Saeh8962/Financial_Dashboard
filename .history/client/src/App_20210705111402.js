import logo from './logo.svg';
import React from "react";
import './App.scss';
import DrawerContainer from "./layout/DrawerContainer";
import Dashboard from "./Dashboard";
function App() {
  return (
   <DrawerContainer>
     <div className="page-container">
       <Dashboard />
     </div>
   </DrawerContainer>
  );
}

export default App;
