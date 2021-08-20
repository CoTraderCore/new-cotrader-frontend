import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { APIEnpoint } from '../StateContext/config';
import { FundContext } from '../StateContext/Context'
import { observer, inject } from "mobx-react";
import { chartColors } from '../Colors/ChartColors';
import FundStore from '../StateContext/FundStore';
import { Pie } from "react-chartjs-2";

const Card = (props) => {
    const { address } = useParams();
    const {userData, setUserData}= useContext(FundContext);

    const styles = {
      pieContainer: {
        width: "20%",
        height: "20%",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)"
      },
      relative: {
        position: "relative"
      }
    };
       


   

    return (
        <div >
          <div >
            {
              userData
                .filter((userData) => userData.address === address)
                .map((userData) => (
                  <div key={ userData.address }>
                    <h2>Name: {userData.name}</h2>
                     <h2>  {JSON.parse(userData.balance).map((balance) => {
                       
                       return (
                         <item key={balance.address} id={balance.symbol}>
                           
                           <img
                            autocomplete="false"
                            
                             class="coins"
                             
                             height="25px"
                             width="25px"
                             src={
                               `https://assets.coincap.io/assets/icons/${balance.symbol.toLowerCase()}@2x.png` 
                                 }  
                                 onError={(e)=>{e.target.onerror = null; e.target.src="https://www.easymarkets.com.au/wp-content/uploads/2018/06/eM-ETH-Coin.png"}}
                           />
                           
                         </item>
                       );
                     })}</h2>
                       <h2>  {JSON.parse(userData.shares).map((shares) => {
                       
                       return (
                         <item key={shares.user} >
                           <div style={styles.pieContainer}>
                            {shares.user}
                           <Pie  data={
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
                     })}</h2>
                      
                  </div>
                ))}
          </div>
       
        </div>
    )
}

export default inject('FundStore')(observer(Card)); 