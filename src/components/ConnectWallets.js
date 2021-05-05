import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

const ConnectWallet = observer((props) => {
  console.log(props)
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
      props.store.web3Modal.clearCachedProvider();
      props.store.account=false
      props.store.web3Modal=null
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getBalance() {
      if (props.store.accounts && props.store.web3) {
        const balance = await props.store.web3.eth.getBalance(props.store.accounts[0]);
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
              <span>
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
          style={{ cursor: "pointer" }}
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </a>
      )}
    </div>
  );
});

export default ConnectWallet;