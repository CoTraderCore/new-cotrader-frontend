import { useContext, useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { FundContext } from '../StateContext/Context'
import { APIEnpoint } from "../StateContext/config";
import FundStore from '../StateContext/FundStore'
import Search from '../Actions/Search'
import AdvancedFilter from '../Actions/AdvancedFilter'
import { NavLink } from "react-router-dom";

import Web3 from "web3";
import React from 'react'
import { walletStore } from "../Buttons/WalletStore";
import CreateNewFund from "../Buttons/CreateNewFund";
import setPending from "../../utils/setPending";
import ConnectWallet from "../Buttons/ConnectWallet";


function Table(){
    const {userData, setUserData}= useContext(FundContext);
    const [sortType, setSortType] = useState('');
    const [txCount, setTxCount] = useState(0);
    useEffect(() => {
      var web3 = new Web3(
        new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
      );
      walletStore.web3 = web3;
    

        const getFetch = async () => {
          const response = await fetch(APIEnpoint);
          const jsonData = await response.json();
          // console.log(jsonData)
    
          FundStore.initSFList(jsonData.result);
          setUserData(FundStore.SmartFunds);
        };
    
        getFetch();
      }, []);

      const updatePending = (_bool, _txCount) => {
        setPending(_bool);
        setTxCount(_txCount);
      };
    


      const sortedItems = React.useMemo(() => {
        const sortableItems = [...userData]
        if (sortType !== null) {
          FundStore.SmartFunds.sort((a, b) => {
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
     

    return(
        <div>
          <div>
          <Search /> <AdvancedFilter/>
          <CreateNewFund  class ="grad "account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/> 
          <ConnectWallet store={walletStore}/>
           <label><select onChange={(e)=>requestSort(e.target.value)} > 

        <option value="">Sort By</option>
    <option value="name">Name (Descending)</option>
                  <option value="name" >Name (Ascending)</option>
             <option value="profitInETH" >Growth In ETH (Ascending)</option>
             <option value="profitInETH" >Growth In ETH (Descending)</option>
              <option value="profitInUSD"> Growth In USD (Ascending)</option>
              <option value="profitInUSD">Growth In USD (Descending)</option>
               <option value="valueInETH">Value In ETH (Ascending)</option>
               <option value="valueInETH" >Value In ETH (Descending)</option>
             <option value="valueInUSD">Value In USD (Ascending)</option>
             <option value="valueInUSD">Value In USD (Descending)</option>
         </select></label>
         </div>
          


         <div style={{overflowX:"auto"}}>
            <table>
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
             <th>Main Asset</th>
              <th class="wh"> 7d </th>
            </tr>
          </thead>
                <tbody>
                {userData &&
              userData.map((userData) => (
                <tr key={userData.name}>
                <td>{userData.owner.slice(0, -34)+"..." }</td>
                  <td  >
                  <NavLink
                      style={{ fontFamily:"Bahnschrift",fontSize: "13px" ,color: "#14044d"}}
                      to={"/fund/" + userData.address}>
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
                            style={{border: "1px solid #693C5E", borderRadius:"15px" , backgroundColor:"#fff"}}
                            height="25px"
                            width="25px"
                            src={
                              `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                }  
                                onError={(e)=>{e.target.onerror = null; e.target.src="https://www.easymarkets.com.au/wp-content/uploads/2018/06/eM-ETH-Coin.png"}}
                          />
                        </item>
                      );
                    })}
                  </td>

                  <td> {userData.valueInETH.slice(0, -10) } </td>
                  <td>{userData.valueInUSD.slice(0, -10) }</td>
                  <td>{userData.historyProfitInETH.slice(0, -15)}</td>
                  <td>{userData.historyProfitInUSD.slice(0, -15)}</td>
                  <td>{userData.mainAsset}</td>
                  
                  
                </tr>
              ))}
                </tbody>
            </table>
            </div>
            </div>
      
    )

}

export default inject('FundStore')(observer(Table));