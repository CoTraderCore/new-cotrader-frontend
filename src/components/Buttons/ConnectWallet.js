import React, { useEffect, useState } from "react";
import { observer , inject} from "mobx-react";
import Web3 from "web3";
import wallet from "../Images/wallet.png"
const ConnectWallet = (props) => {
  const connectWallet = async () => {
    try {
      await props.store.getweb3();
      props.store.accounts = await props.store.web3.eth.getAccounts();
    } catch (e) {
      console.log(e);
    }
  };

  const disconnectWallet = async () => {
    try {
      // console.log(props.store.web3.currentProvider)
      props.store.web3Modal.clearCachedProvider();
      props.store.account = false;
      props.store.web3Modal = null;
      var web3 = new Web3(
        new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
      );
      props.store.web3=web3;
      // console.log(props.store.web3.currentProvider)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    async function getBalance() {
      if (props.store.accounts && props.store.web3) {
        const balance = await props.store.web3.eth.getBalance(
          props.store.accounts[0]
        );
        props.store.balance = parseFloat(
          props.store.web3.utils.fromWei(balance.toString())
        ).toFixed(4);
      }
    }

    getBalance();
  });

  return (
    <div>
      {props.store.account ? (
        <span>
          {props.store.accounts ? (
            <div>
             <span>Address:{props.store.accounts[0]}</span>
              <br />
              <span >
                Balance:{props.store.balance} ETH
                <a
                  className="header-right wall"
                  style={{ cursor: "pointer" }}
                  onClick={() => disconnectWallet()}
                >
                  Disconnect
                </a>
              </span>
            </div>
          ) : (
            "Loading"
          )}
        </span>
      ) : (
        <a
          className="header-right wall"
          style={{ cursor: "pointer" ,fontSize:"18px"}}
          onClick={() => connectWallet()}
        >
          Connect Wallet <img style={{marginLeft:"5px"}}src ={wallet}/>
        </a>
      )}
    </div>
  );
}

export default inject('FundStore')(observer(ConnectWallet)); 