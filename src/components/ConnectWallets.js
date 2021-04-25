import React, { Component } from 'react';
import { observer } from "mobx-react"

export default observer(
  
  class Wallet extends Component {

    connectWallet=async() =>{
      await this.props.store.getweb3().then((response) => {
        response.eth.getAccounts().then((result) => {console.log(result);this.props.store.accounts=result});
      });
    }
    
    render() { 
      return (
        <div>
        {(this.props.store.account)? <h1>Connected</h1>: <a id="GFG" className="header-right wall" style={{"cursor":"pointer"}} onClick = {this.connectWallet}>Connect Wallet</a>}
        </div>
         
        );
    }
  }
  
);


