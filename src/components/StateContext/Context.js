
import Table from "../FundListTable/Table";
import { createContext } from "react";
import Tabs from "../FundPageCard/Tabs";
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { walletStore } from "../Buttons/WalletStore";
import ConnectWallet from "../Buttons/ConnectWallet";
import logo from "../Images/logo.png"
import "../StateContext/context.css"


 const FundContext = createContext();

function FundProvider() {
  const [userData, setUserData] = React.useState([])
 const FundStore = {userData, setUserData}
	 
  return (
    <FundContext.Provider value={FundStore}>
    <Router>
    <div class="header">
  <a href="/" ><img style={{height:'30px'}} src={logo} class="img" alt="pic" /></a>
  <a href="/" class='glow'>For Depositors</a>
  <a href="/" class='glow'>For Pack Managers</a>
  
      <div class="header-right">
    
     <ConnectWallet store={walletStore}/>
  </div>
</div>
    <Switch>
      <Route exact path="/" component={Table} />
      
      <Route path="/fund/:address" render={(props)=><Tabs {...props}/>} />
      </Switch>
      </Router>
  </FundContext.Provider>
  );
}
const FundConsumer = FundContext.Consumer
export { FundProvider, FundConsumer, FundContext }
export default inject('FundStore')(observer(FundProvider));