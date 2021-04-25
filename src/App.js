import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Smartfunds } from "./components/Smartfunds";
import { FundManagers } from "./components/FundManagers";
import { Traders } from "./components/Traders";
import ViewFund from "./components/ViewFund";
import ConnectWallet from './components/ConnectWallets'
import {walletStore} from "./models/wallet_model";

import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import "./App.css";
import logo from "./Icons/logo.png";
import setting from "./Icons/setting.png";
import option from "./Icons/option.png";

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <nav class="navbar navbar-expand  text-white">
          <div class="container-fluid">
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
              <a id="GFG" class="nav-item header-left" href="/">
                {" "}
                Smartfunds{" "}
              </a>

              <a id="GFG" class="nav-item header-left" href="/fundmanagers">
                {" "}
                Fund Managers
              </a>

              <a id="GFG" class="nav-item header-left" href="/traders">
                {" "}
                Traders{" "}
              </a>
            </div>

            <div class="navbar-nav ml-auto">
            <ConnectWallet store={walletStore}/>
              <a id="GFG" href="#" class="header-right section">
                <img src={setting} alt="settings" />
              </a>
              <a id="GFG" href="#" class="header-right section">
                <img src={option} alt="option" />
              </a>
            </div>
          </div>
        </nav>
        <hr />
      </React.Fragment>

      <Switch> 
        <Route exact path="/" component={Smartfunds} />
        <Route path="/fundmanagers" component={FundManagers} />
        <Route path="/traders" component={Traders} />
        <Route path="/fund/:address" render={(props)=><ViewFund {...props}/>} />
      </Switch>
    </Router>
  ); 
}
