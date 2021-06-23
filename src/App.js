import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ForDepositors } from "./components/ForDepositors";
import { ForpackManagers } from "./components/ForpackManagers";
import ViewFund from "./components/ViewFund";
import ConnectWallet from './components/ConnectWallets'
import {walletStore} from "./models/wallet_model";
import darkbadge from "./Icons/darkbadge.jpg"
import darklogo from "./Icons/darklogo.jpg"
import wallet from "./Icons/wallet.png"

import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import "./stylesheet/App.css";
import logo from "./Icons/logo.png";
import setting from "./Icons/setting.png";
import option from "./Icons/option.png";

export default function App() {
  
  return (
    
    <Router>
      
        <nav style={{backgroundColor:"#212E52"}}class="navbar navbar-expand  text-white">
          <div   class="container-fluid">
            <button
              type="button"
              class="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-nav ">
              <a id="GFG" class="navbar-brand mr-3 img" to="/">
                <img src={logo} class="img" alt="pic" />
              </a>
              <a id="GFG" style={{fontSize:"16px"}} class="nav-item header-left" href="/">
                {" "}
                For Depositors{" "}
              </a>

              <a id="GFG"  style={{fontSize:"16px"}} class="nav-item header-left" href="/forpackmanagers">
                {" "}
                For Pack Managers{" "}
              </a>
            </div>

            <div class="navbar-nav ml-auto">
              <div style={{display:"inline-flex"}}>
            <ConnectWallet store={walletStore}/>
              
              </div>
            </div>
          </div>
        </nav>
        <hr />
        

      <Switch> 
        <Route exact path="/" component={ForDepositors} />
        <Route path="/forpackmanagers" component={ForpackManagers} />
        <Route path="/fund/:address" render={(props)=><ViewFund {...props}/>} />
      </Switch>
    </Router>
  ); 
}
