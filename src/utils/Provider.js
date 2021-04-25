import React, {useState ,useEffect} from 'react';
import Web3 from 'web3';



const Provider = async() => {
    //e.preventDefault();
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
        } catch (error) {
            console.log(error);
        }
    }
    else if (window.web3) {
      try{
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");

      }
      catch (error){
        console.log(error);
      }
    }
    else {
      console.log("No provider yet");
    }
    // else {
    //     // local provider - ganache, etc
    // }
    return (
      <div><p>test</p></div>
    )
}

export default Provider;