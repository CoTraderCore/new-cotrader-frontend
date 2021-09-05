import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { APIEnpoint } from '../StateContext/config';
import { FundContext } from '../StateContext/Context'
import { observer, inject } from "mobx-react";
import { chartColors } from '../Colors/ChartColors';
import FundStore from '../StateContext/FundStore';
import { Pie } from "react-chartjs-2";
import "./card.css"
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import blueice from "../Images/blueice.jpg"
import { ListGroup } from 'react-bootstrap';
import { fromWei} from "web3-utils";
const Tabs = (props) => {
    const { address } = useParams();
    const {userData, setUserData}= useContext(FundContext);

    const styles = {
      pieContainer: {
        width: "12%",
        height: "12%",
        top: "95%",
        left: "20%",
        position: "absolute",
        transform: "translate(-50%, -50%)"
      },
      relative: {
        position: "relative"
      }
    };
       


   

    return (
      <div style={{overflowX:"hidden", backgroundRepeat:"no-repeat", overflowY:"auto"}}>
      <BrowserView>
        <div ><h1 style={{padiing :"20px", margin:"40px" ,textShadow: "0 0 15px #B0C4DE"}} > {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  {userData.name}
                      </item> 
                     ))}</h1>
        
          <table style={{background: "#B0C4DE",
        fontSize: "18px", 
   fontFamily:"Dosis",
        margin: "40px", width:"60%"}}>
            <tr style={{backgroundColor:"#B0C4DE", paddingLeft:"10px"}}><th>Asset</th>
            <th style={{padding:"20px"}}>Balance</th>
            <th style={{padding:"20px"}}>Type</th>
            <th style={{padding:"20px"}}>Percent In ETH</th>
            <th style={{padding:"20px"}}>Asset Value In ETH</th>
           </tr>
            <tbody  >
              <tr style={{ background: "#fff",
 
  color:"#430f58"
}}><td >  
            {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  {userData.Name}
                       {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           <ListGroup style={{ padding:"2px"}}>
                           <img
                            autocomplete="false"
                            
                          style={{border: "1px solid #183661", borderRadius:"14px"}}
                             
                             height="30px"
                             width="30px"
                             src={
                               `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                 }  
                                 onError={(e)=>{e.target.onerror = null; e.target.src="https://www.easymarkets.com.au/wp-content/uploads/2018/06/eM-ETH-Coin.png"}}
                           />
                           </ListGroup>
                         </item>
                       );
                     })} </item> 
                     ))}
                 </td>
                 <td style={{height:"40px"}}>{
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  
                       {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           <ListGroup style={{ padding:"10px"}}>
                          {balance.balance}
                           </ListGroup>
                         </item>
                       );
                     })} </item> 
                     ))}</td>
                 <td style={{height:"40px"}}>
                 {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  
                       {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           <ListGroup style={{ padding:"10px"}}>
                          {balance.type}
                           </ListGroup>
                         </item>
                       );
                     })} </item> 
                     ))}
                 </td>
                 <td style={{height:"40px"}}>
                 {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  
                       {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           <ListGroup style={{ padding:"10px"}}>
                          {balance.percentInETH}
                           </ListGroup>
                         </item>
                       );
                     })} </item> 
                     ))}
                 </td>
                 <td style={{height:"40px"}}>
                 {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                  
                       {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           <ListGroup style={{ padding:"10px"}}>
                          {balance.assetValueInETH}
                           </ListGroup>
                         </item>
                       );
                     })} </item> 
                     ))}
                 </td>
              </tr>
            </tbody>
            </table>
      
        
         



          <div style={{background: "#B0C4DE",
        fontSize: "18px", 
        padding: "10px",
        margin: "40px"}} class="tabs">
  <input type="radio" name="tabs" id="tabone" defaultChecked="checked"/>
  <label for="tabone">Factsheet</label>
  <div class="tab">
  {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                    
             <p > Name&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.name}</p>
                <p > Manager&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userData.owner}</p>
              
                      </item> 
                     ))}
  </div>
  
  <input type="radio" name="tabs" id="tabtwo"/>
  <label for="tabtwo">Financials</label>
  <div class="tab">
  {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                     {JSON.parse(userData.shares).map((shares) => {
                       
                       return (
                         <item key={shares.user} >
             <p > Shares User&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{shares.user}</p>
                <p > Shares&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {shares.shares}</p>
                </item>
                       );
                     })}</item> 
                      
                
                ))}
  </div>
  
  <input type="radio" name="tabs" id="tabthree"/>
  <label for="tabthree">Fees</label>
  <div class="tab">
  {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                    
             <p > Main Asset&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.mainAsset}</p>
                <p > Manager Fee&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {userData.managerFee/100}%</p>
              
                      </item> 
                     ))}
  </div>

  <input type="radio" name="tabs" id="tabfour"/>
  <label for="tabfour">Ruleset</label>
  <div class="tab">
   
  </div>

  <input type="radio" name="tabs" id="tabfive"/>
  <label for="tabfive">Depositors</label>
  <div class="tab">
   
  </div>

  <input type="radio" name="tabs" id="tabsix"/>
  <label for="tabsix">Deposits</label>
  <div class="tab">
  
  </div>

  <input type="radio" name="tabs" id="tabseven"/>
  <label for="tabseven">Trades</label>
  <div class="tab">
   
  </div>
  
</div>
 <div style={{overflowY:"auto" , overflowX:"hidden"}}> {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                   {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} >
                            <img
                            autocomplete="false"
                            
                          style={{border: "1px solid #183661", borderRadius:"14px", marginLeft:"30px"}}
                             
                             height="30px"
                             width="30px"
                             src={
                               `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                 }  
                                 onError={(e)=>{e.target.onerror = null; e.target.src="https://www.easymarkets.com.au/wp-content/uploads/2018/06/eM-ETH-Coin.png"}}
                           />
                           </item>
                           );
                         })}</item> 
                          
                    
                    ))}</div>

<div >  {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <item key={ userData.address }>
                   {JSON.parse(userData.shares).map((shares) => {
                       
                       return (
                         <item key={shares.user} >
                           
                           <div style=   {{width:"200px", marginLeft:"50px", marginBottom:"100px"}}>
                         
                           <Pie data={
                             {
                              
                               datasets:[{
                                 
                                 data: [shares.shares],
                                 backgroundColor: chartColors,
                                 hoverBackgroundColor: chartColors
                                 }]
                                
                                }
                           
                           } /></div>
                         </item>
                       );
                     })}</item> 
                      
                
                ))}</div>
         
        </div></BrowserView></div>
    )
}

export default inject('FundStore')(observer(Tabs)); 