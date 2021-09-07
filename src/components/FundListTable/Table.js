import { useContext, useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { FundContext } from '../StateContext/Context'
import { APIEnpoint } from "../StateContext/config";
import FundStore from '../StateContext/FundStore'
import Search from '../Actions/Search'
import AdvancedFilter from '../Actions/AdvancedFilter'
import { NavLink } from "react-router-dom";
import "./table.css"
import Web3 from "web3";
import React from 'react'
import { walletStore } from "../Buttons/WalletStore";
import CreateNewFund from "../Buttons/CreateNewFund";
import setPending from "../../utils/setPending";
import "./MobileView.css"
import { Pagination } from "@material-ui/lab";


import ConnectWallet from "../Buttons/ConnectWallet";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { ListGroup } from "react-bootstrap";
import { fromWei, toWei, toBN, isNumber} from "web3-utils";



function Table(){
    const {userData, setUserData}= useContext(FundContext);
    const [sortType, setSortType] = useState('');
    const [txCount, setTxCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
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
          setUserData(FundStore.SmartFundsOriginal);
         
        };
    
        getFetch();
      }, []);

      const updatePending = (_bool, _txCount) => {
        setPending(_bool);
        setTxCount(_txCount);
      };
    
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);
      const count = Math.ceil(userData.length / postsPerPage);
     
      const handleChange = (event, value) => {
        setCurrentPage(value);
       
      };
     
      const sortedItems = React.useMemo(() => {
        const sortableItems = [...currentPosts]
        
        if (sortType !== null) {
          userData.sort((a, b) => {
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
     
   
    return(
      
   
        <div>
          <BrowserView>
          <div class ="nav"style={{  color:"#5c3e84" , fontSize:'35px' , fontFamily:"Bahnschrift Light" }}>
      
      <span style ={{marginLeft:'70px', fontWeight:'bold'}}>Browse & Deposit</span>
        
       
      <div class='nav-right'>
   &nbsp;&nbsp;&nbsp;&nbsp; <button style={{backgroundColor:"#5c3e84",width: '120px', color:"#fff",fontSize:'20px' , fontFamily:"Dosis", borderRadius:'10px',padding:'10px 10px 10px 10px' }}><CreateNewFund  account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
      
        <button style={{ backgroundColor:"#5c3e84", marginRight: '70px', width: '120px', color:"#fff",fontSize:'20px' , fontFamily:"Dosis", borderRadius:'10px',padding:'10px 10px 10px 10px' }}><a >
          
           My Deposits
        </a></button></div>
      
       
        </div><br/>
      

<div class="subnav">
<Search/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<select  style={{borderRadius:"7px",outlineColor:"#e5f866",  height: "35px",  paddingLeft:'10px',color:'#430f58',  fontSize:'15px' ,fontFamily:'Dosis', backgroundColor:"rgb(238, 238, 248)",cursor:'pointer', border:"1px solid #D3D3D3"}} onChange={(e)=>requestSort(e.target.value)} > 

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
 </select>
 <div class='subnav-right'>
 <AdvancedFilter/></div></div>
         <div style={{overflowX:"auto"}}>
         
       
      
     
      

            <table>
            
            <tr>
            <th>Owner</th>
              <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>Name</th>
              <th  onClick={() => requestSort('profitInETH')} className={getClassNamesFor('profitInETH')}>Growth In ETH </th>

              <th  onClick={() => requestSort('profitInUSD')} className={getClassNamesFor('profitInUSD')}> Growth In USD </th>
              <th >Top Assets </th>
              <th  onClick={() => requestSort('valueInETH') } className={getClassNamesFor('valueInETH')}>Value In ETH </th>
              <th  onClick={() => requestSort('valueInUSD')} className={getClassNamesFor('valueInUSD')}> Value In USD </th>
             <th   onClick={() => requestSort('historyProfitInETH') }className={getClassNamesFor('historyProfitInETH')} >History Profit-ETH</th>
             <th   onClick={() => requestSort('historyProfitInUSD') } className={getClassNamesFor('historyProfitInUSD')}>History Profit-USD</th>
             
            <th>7d</th>
            </tr>
        
                
                {userData &&
              currentPosts.map((userData) => (
                <tr key={userData.name}>
                <td  >{userData.owner.slice(0, -30)+"..." }</td>
                  <td>
                  <NavLink  style={{textDecoration:'none', color:"#430f58"}} 
                      to={"/fund/" + userData.address} >
                      {userData.name}
                    </NavLink>
                  </td>
                  <td  > {fromWei(userData.profitInETH).slice(0, -12)}</td>  
                  <td  >{fromWei(userData.profitInUSD).slice(0, -12)}</td>

                  <td >
                    {" "}
                    {JSON.parse(userData.balance).map((balance) => {
                       
                      return (
                        <item key={balance.address} id={balance.symbol}>
                         
                          <img
                           autocomplete="false"
                           
                            class="coins"
                            style={{ borderRadius:"15px" , backgroundColor:"#fff"}}
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

                  <td >  {fromWei(userData.valueInETH).slice(0, -12)}</td>
                  <td > {fromWei(userData.valueInUSD).slice(0, -12)}</td>
                  <td >{fromWei(String(Number(userData.historyProfitInETH).toPrecision())).slice(0, -12)}</td>

                  <td >{(userData.historyProfitInUSD).slice(0, -12)}</td>
                
                  <td >{<NavLink  style={{textDecoration:'none'}} class="nav-links"
                      to={"/fund/" + userData.address} >
                      View&nbsp;Fund 
                    </NavLink>}</td>
                  
                </tr>
              ))}
          
        
    
            </table>
            <br/>
          { userData && <Pagination style={{marginRight:"70px", float:"right"}} count={count} variant="outlined" onChange={handleChange} color="primary" />}
            </div>
            </BrowserView>
            <MobileView>
             
             <h2  style={{color:"#5c3e84", textAlign:'Center', fontSize:"30px"}}>Browse & Deposit</h2>
            <div style={{alignItems:"Center", paddingLeft:"50px"}}><button style={{backgroundColor:"#5c3e84",width: '120px', color:"#fff",fontSize:'20px' , fontFamily:"Dosis", borderRadius:'10px',padding:'10px 10px 10px 10px' }}><CreateNewFund  account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
      
        <button style={{ backgroundColor:"#5c3e84",  width: '120px', color:"#fff",fontSize:'20px' , fontFamily:"Dosis", borderRadius:'10px',padding:'10px 10px 10px 10px' }}><a >
          
           My Deposits
        </a></button></div><br/>
      <div style={{display:"flex", width:"100%",alignItems:"center", marginLeft:"15px"}}><Search/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<AdvancedFilter/></div>
      <select  style={{borderRadius:"7px",width:"90vw", marginTop:"5px", outlineColor:"#e5f866", marginLeft:"15px", height: "35px",  paddingLeft:'10px',color:'#430f58',  fontSize:'15px' ,fontFamily:'Dosis', backgroundColor:"rgb(238, 238, 248)",cursor:'pointer', border:"2px solid #f0eec8"}} onChange={(e)=>requestSort(e.target.value)} > 

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
 </select>
 
             <div class="columns"> 
            
            {  userData &&
              currentPosts.map((userData) => (
                
              
  <item key ={userData.address} class="price">
    <li class="header">Name<br/>{userData.name}</li>
    <li>Owner<br/>{userData.owner.slice(0, -10)+"..." }</li>
    <li>{JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                          {balance.symbol}
                           <img
                            
                            
                             
                             style={{border: "1px solid #693C5E", borderRadius:"15px" , backgroundColor:"#fff"}}
                             height="25px"
                             width="25px"
                             src={
                               `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                 }  
                                 onError={(e)=>{e.target.onerror = null; e.target.src="https://www.easymarkets.com.au/wp-content/uploads/2018/06/eM-ETH-Coin.png"}}
                           /> &nbsp;&nbsp;
                         </item>
                       );
                     })}</li>
    <li>Value In ETH<br/> {fromWei(userData.valueInETH).slice(0, -10)}</li>
    <li>Value In USD<br/> {fromWei(userData.valueInUSD).slice(0, -10)}</li>
    <li>Profit In ETH<br/>{fromWei(userData.profitInETH).slice(0, -10)}</li>
    <li>Profit In USD<br/>{fromWei(userData.profitInUSD).slice(0, -10)}</li>
    <li>History profit In ETH<br/>{fromWei(String(Number(userData.historyProfitInETH).toPrecision())).slice(0, -10)}</li>
    <li>History profit In USD<br/>{userData.historyProfitInUSD.slice(0, -10)}</li>
    <li>Main Asset <br/>{userData.mainAsset}</li>
    <li class="grey"> <NavLink  style={{textDecoration:'none'}} 
                      to={"/fund/" + userData.address}  >
                      View Fund Details
                    </NavLink></li> <br/>
                   
  </item>
              ))
           }{userData && <Pagination style={{marginRight:"70px", float:"right"}} count={count} variant="outlined" onChange={handleChange} color="primary" />} <br/><br/><br/><br/><br/> </div> <br/><br/><br/>
  
              
            
   </MobileView>

            </div>
            
          
    )

}

export default inject('FundStore')(observer(Table));