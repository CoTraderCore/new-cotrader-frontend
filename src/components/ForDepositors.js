import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APIEnpoint } from "../config";
import { Tokenimagelink } from "../config";
import { walletStore } from "../models/wallet_model";
import {fundsStorage}from "../models/fundsStorage";
import Web3 from "web3";
import { observer } from "mobx-react";
import "../stylesheet/nav.css";
import { DataGrid } from '@material-ui/data-grid';

import Stock from "./Stock";
import CreateNewFund from "./actions/CreateNewFund";
import Panel from "./Panel";
import Filter from "./Filter"
import TablePagination from '@material-ui/core/TablePagination';


export const ForDepositors = observer(() => {
  const [userData, setUserData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pending, setPending] = useState(false);
  const [txCount, setTxCount] = useState(0);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    var web3 = new Web3(
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
    );
    walletStore.web3 = web3;
    //console.log(web3.currentProvider);

    const getFetch = async () => {
      const response = await fetch(APIEnpoint);
      const jsonData = await response.json();
      // console.log(jsonData)

      fundsStorage.initSFList(jsonData.result);
      setUserData(fundsStorage.SmartFunds);
    };

    getFetch();
  }, []);
 
  const updateList = (input) => {
    // console.log(input);
    const filtered = fundsStorage.SmartFunds.filter((userData) => {
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
      setUserData(fundsStorage.SmartFunds);
    } else setUserData(filtered);
  };

  const updatePending = (_bool, _txCount) => {
    setPending(_bool);
    setTxCount(_txCount);
  };


  const sortedItems = React.useMemo(() => {
    const sortableItems = [...userData]
    if (sortType !== null) {
      fundsStorage.SmartFunds.sort((a, b) => {
        if (a[sortType.key] < b[sortType.key]) {
          return sortType.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortType.key] > b[sortType.key]) {
          return sortType.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [userData, sortType]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortType &&
      sortType.key === key &&
      sortType.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortType({ key, direction });
  };

  const getClassNamesFor = (valueInETH) => {
    if (!sortType) {
      return;
    }
    return sortType.key === valueInETH ? sortType.direction : undefined;
  };
  
 

  return (
    <div>
   
      <div style={{ color:"#14044d", height:"50px" , backgroundColor:"#e8e8e8", marginBottom:"20px"}}>
      <h4 style={{  display:"inline",marginTop:"12px",marginLeft:"80px" }}>
        Browse & Deposit
        
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a style={{fontSize:"18px",marginTop:"12px", color:"#14044d" }} id="GFG" href="">
        {" "}
        Browse Leaderboard{" "}
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a style={{fontSize:"18px",marginTop:"12px",  color:"#14044d"}}  id="GFG" href="">
        {" "}
        Browse All
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <CreateNewFund id ="GFG" class ="grad "account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/> 
        
      
        <a id="GFG" class="grad" href="" style={{marginRight:"15px"}}>
          {" "}
           My Deposits{" "}
        </a>
        </h4>
       
        </div>
      
       
      
      
    
      <div >
    
  
      
      <input
      style={{marginLeft:"80px"}}
         class="search"
          id="filter"
          type="text"
          
          onChange={(e) => {
            setKeyword(e.target.value);
            updateList(e.target.value);
          }}
        />  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label style={{ color:"#14044d"}}>Sort by: &nbsp;&nbsp;&nbsp;&nbsp;<select id="selection" style={{ fontFamily:"segoe ui"}}  onChange={(e)=>requestSort(e.target.value)}> 
    
<option value="name">Name (Descending)</option>
              <option value="name" >Name (Ascending)</option>
         <option value="profitInETH" >Growth In ETH (Ascending)</option>
         <option value="profitInETH" >Growth In ETH (Descending)</option>
          <option value="profitInUSD"> Growth In USD (Ascending)</option>
          <option value="profitInUSD">Growth In USD (Descending)</option>
           <option value="valueInETH">Value In ETH (Ascending)</option>
           <option value="valueInETH" selected>Value In ETH (Descending)</option>
         <option value="valueInUSD">Value In USD (Ascending)</option>
         <option value="valueInUSD">Value In USD (Descending)</option>
     </select></label> 
      
  
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
   </div>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    <div  style={{display:"inline"}}>
    <div style={{ marginLeft:"-340px"}}><Filter /></div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    <div style={{  marginLeft:"-130px" ,marginTop:"-50px"}} ><Panel /> </div>
    
    </div>
    
    
      <div style={{marginTop:"20px"}} >
     
      
      

        <table class="layout">
          <thead>
            <tr>
            <th>Owner</th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('name')}  >Name</th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('profitInETH')}>Growth In ETH </th>

              <th class="wh" style={{cursor:"pointer"}} onClick={() => requestSort('profitInUSD')}  > Growth In USD </th>
              <th class="wh"  >Top Assets </th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('valueInETH')}  >Value In ETH </th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('valueInUSD')}  > Value In USD </th>
             <th class="wh"  style={{cursor:"pointer"}} onClick={() => requestSort('historyProfitInETH')}  >History Profit-ETH</th>
             <th  class="wh"  style={{cursor:"pointer"}} onClick={() => requestSort('historyProfitInUSD')}  >History Profit-USD</th>
              <th class="wh"> 7d </th>
            </tr>
          </thead>

          <tbody >
            {userData &&
              userData.map((userData) => (
                <tr key={userData.name}>
                <td>{userData.owner.slice(0, -34)+"..." }</td>
                  <td  >
                    <NavLink
                      style={{ fontFamily:"Bahnschrift",fontSize: "14px" ,color: "#14044d"}}
                      to={"/fund/" + userData.address}
                    >
                      {userData.name}
                    </NavLink>
                  </td>
                  <td> {userData.profitInETH.slice(0, -10) }</td>  
                              <td>{userData.profitInUSD.slice(0, -10)}</td>

                  <td >
                    {" "}
                    {JSON.parse(userData.balance).map((balance) => {
                       
                      return (
                        <item key={balance.address} id={balance.symbol}>
                         
                          <img
                           autocomplete="false"
                           
                            class="coins"
                            style={{border: "1px solid #693C5E", borderRadius:"20px" , backgroundColor:"#fff"}}
                            height="30px"
                            width="30px"
                            src={
                              `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                }  
                           
                          />
                        </item>
                      );
                    })}
                  </td>

                  <td> {userData.valueInETH.slice(0, -10) } </td>
                  <td>{userData.valueInUSD.slice(0, -10) }</td>
                  <td>{userData.historyProfitInETH.slice(0, -15)}</td>
                  <td>{userData.historyProfitInUSD.slice(0, -15)}</td>
                  <td>{<Stock address={userData.address} />}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
   
  );
});
