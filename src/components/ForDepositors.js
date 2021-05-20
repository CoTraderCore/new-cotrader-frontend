import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APIEnpoint } from "../config";
import { Tokenimagelink } from "../config";
import { walletStore } from "../models/wallet_model";
import {fundsStorage}from "../models/fundsStorage";
import Web3 from "web3";
import { observer } from "mobx-react";
import "../stylesheet/nav.css";

import Stock from "./Stock";
import CreateNewFund from "./actions/CreateNewFund";
import Panel from "./Panel";



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
        userData.name.toLowerCase().includes(input.toLowerCase()) ||
        userData.profitInETH.toLowerCase().includes(input.toLowerCase()) ||
        userData.profitInUSD.toLowerCase().includes(input.toLowerCase()) ||
        userData.valueInUSD.toLowerCase().includes(input.toLowerCase())
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

  const getClassNamesFor = (name) => {
    if (!sortType) {
      return;
    }
    return sortType.key === name ? sortType.direction : undefined;
  };
  
  

  return (
    <div class="layout">
   
      
      <h4 >
        Browse & Deposit
        
        <CreateNewFund id ="GFG" class ="grad "account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/> {" "} {" "} {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a id="GFG" class="grad" href="">
          {" "}
           My Deposits{" "}
        </a>
        
      </h4>
      
      <a id="GFG" href="">
        {" "}
        Browse Leaderboard{" "}
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a id="GFG" href="">
        {" "}
        Browse All
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a id="GFG" href="">
        {" "}
        My Deposits{" "}
      </a>
      
      <hr />
      
      <div>
         <input
          class="search"
          id="filter"
          type="text"
          placeholder="&#128269;Search Pack"
          onChange={(e) => {
            setKeyword(e.target.value);
            updateList(e.target.value);
          }}
        />
      <div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<label >Sort by:</label> <select id="selection" style={{ fontFamily:"segoe ui"}}  onChange={(e)=>requestSort(e.target.value)}> 
    
<option value="name">Name (Descending)</option>
              <option value="name" >Name (Ascending)</option>
         <option value="profitInETH" >Growth In ETH (Ascending)</option>
         <option value="profitInETH">Growth In ETH (Descending)</option>
          <option value="profitInUSD"> Growth In USD (Ascending)</option>
          <option value="profitInUSD">Growth In USD (Descending)</option>
           <option value="valueInETH">Value In ETH (Ascending)</option>
           <option value="valueInETH">Value In ETH (Descending)</option>
         <option value="valueInUSD">Value In USD (Ascending)</option>
         <option value="valueInUSD">Value In USD (Descending)</option>
     </select></div>
         <Panel />
        
        
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div>
        <table id="jtable" >
          <thead>
            <tr>
              <th class="wh"> <a style={{cursor:"pointer"}} onClick={() => requestSort('name')}  className={getClassNamesFor('name')}>Name</a></th>
              <th class="wh"><a  style={{cursor:"pointer"}} onClick={() => requestSort('profitInETH')}className={getClassNamesFor('profitInETH')}>Growth In ETH</a> </th>

              <th class="wh"><a  style={{cursor:"pointer"}} onClick={() => requestSort('profitInUSD')}  className={getClassNamesFor('profitInUSD')}> Growth In USD </a></th>
              <th class="wh">Top Assets </th>
              <th class="wh"> <a  style={{cursor:"pointer"}} onClick={() => requestSort('valueInETH')}  className={getClassNamesFor('valueInETH')}>Value In ETH </a></th>
              <th class="wh"><a  style={{cursor:"pointer"}} onClick={() => requestSort('valueInUSD')}  className={getClassNamesFor('valueInUSD')}> Value In USD </a></th>

              <th class="wh"> 7d </th>
            </tr>
          </thead>

          <tbody >
            {userData &&
              userData.map((userData) => (
                <tr key={userData.name}>
                  <td  >
                    <NavLink
                      style={{ fontSize: "14px" }}
                      to={"/fund/" + userData.address}
                    >
                      {userData.name}
                    </NavLink>
                  </td>
                  <td> {userData.profitInETH}</td>
                  <td>{userData.profitInUSD}</td>

                  <td >
                    {" "}
                    {JSON.parse(userData.balance).map((balance) => {
                      return (
                        <item key={balance.address} id={balance.address}>
                          <img
                            class="coins"
                            height="30px"
                            width="30px"
                            src={
                              Tokenimagelink +
                              `${balance.address.toLowerCase()}`
                            }
                          />
                        </item>
                      );
                    })}
                  </td>

                  <td> {userData.valueInETH}</td>
                  <td>{userData.valueInUSD}</td>
                  <td>{<Stock address={userData.address} />}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
