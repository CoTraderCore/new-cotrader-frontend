import { useContext, useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { FundContext } from '../StateContext/Context'
import { APIEnpoint } from "../StateContext/config";
import FundStore from '../StateContext/FundStore'

const Search=()=>{
    const {userData, setUserData}= useContext(FundContext);
    const [keyword,setKeyword] =useState("");
    const updateList = (input) => {
        // console.log(input);
        const filtered = FundStore.SmartFunds.filter((userData) => {
          return (
            userData.owner.toLowerCase().includes(input.toLowerCase()) ||
           
            userData.name.toLowerCase().includes(input.toLowerCase()) ||
            userData.profitInETH.toLowerCase().includes(input.toLowerCase()) ||
            userData.profitInUSD.toLowerCase().includes(input.toLowerCase()) ||
            userData.valueInETH.toLowerCase().includes(input.toLowerCase()) ||
            userData.valueInUSD.toLowerCase().includes(input.toLowerCase()) ||
            userData.historyProfitInETH.toLowerCase().includes(input.toLowerCase()) ||
            userData.historyProfitInUSD.toLowerCase().includes(input.toLowerCase()) 
           
          );
        });
        if (input.length === 0) {
          // console.log(mobxStorage.SmartFunds);
          setUserData(FundStore.SmartFunds);
        } else setUserData(filtered);
      };

    return(
         
      <input
   
          type="text"
          placeholder="Search Funds"
          onChange={(e) => {
            setKeyword(e.target.value);
            updateList(e.target.value);
          }}
        /> 
    )
}

export default inject('FundStore')(observer(Search)); 

