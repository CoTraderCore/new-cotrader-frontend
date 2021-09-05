
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
import { colors } from "@material-ui/core";


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
  
  
  <footer style={{height:"7vh", paddingTop:"10px",textAlign:"center",position:"fixed", bottom:"0", left:"0",width:"100%",  color:"#fff", backgroundColor:"#183661"}} ><img style={{paddingTop:"10px"}} height="25px" src={logo}/>&nbsp; &nbsp; &nbsp; &nbsp; Join the Community </footer>

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