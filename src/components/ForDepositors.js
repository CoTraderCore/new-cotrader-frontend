import React, { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APIEnpoint } from "../config";
import { Tokenimagelink } from "../config";
import { walletStore, mobxStorage } from "../models/wallet_model";
import Web3 from "web3";
import { observer } from "mobx-react";
import "../stylesheet/nav.css";
import Stock from "./Stock";
import Panel from './Panel'

export const ForDepositors = observer(() => {
  const [userData, setUserData] = useState();
  const [keyword, setKeyword] = useState("");
 

  useEffect(() => {
    var web3 = new Web3(
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
    );
    walletStore.web3 = web3;
    //console.log(web3.currentProvider);

    const getGitHubUserWithFetch = async () => {
      const response = await fetch(APIEnpoint);
      const jsonData = await response.json();
      // console.log(jsonData)
      setUserData(jsonData.result);
      mobxStorage.initSFList(jsonData.result);
    };

    getGitHubUserWithFetch();
 
  }, []);

  const updateList = (input) => {
    // console.log(input);
    const filtered = mobxStorage.SmartFunds.filter((userData) => {
      return userData.name.toLowerCase().includes(input.toLowerCase()) ||
      userData.profitInETH.toLowerCase().includes(input.toLowerCase()) ||
      userData.profitInUSD.toLowerCase().includes(input.toLowerCase()) ||
      userData.valueInUSD.toLowerCase().includes(input.toLowerCase());
    });
    if (input.length === 0) {
      // console.log(mobxStorage.SmartFunds);
      setUserData(mobxStorage.SmartFunds);
    } else setUserData(filtered);
  };

 

  return (
    <div class="layout ">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <h2>
        Browse & Deposit
        <a id="GFG" class="grad" href="">
          {" "}
          My Deposits{" "}
        </a>
      </h2>
      
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
      </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<hr />
      <div><input class ="search" id="filter" type="text" placeholder="&#128269;Search Pack" onChange={(e) => {
          setKeyword(e.target.value);
          updateList(e.target.value);
        }}/><Panel/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div>
      <table>
        <thead>
          <tr>
        <th class="wh"> Name</th>
            <th class="wh">Growth In ETH </th>
            
            <th class="wh"> Growth In USD </th>
            <th class="wh">Top Assets </th>
            <th class="wh"> Value In ETH </th>
            <th class="wh"> Value In USD </th>

            <th class="wh"> 7d </th>
          </tr>
        </thead>

        <tbody>
          {userData &&
            userData.map((userData) => (
              <tr key={userData.name}>
                <td>
                  <NavLink style={{fontSize:"14px"}} to={"/fund/" + userData.address}>
                    {userData.name}
                  </NavLink>
                </td>
                <td> {userData.profitInETH}</td>
                <td >{userData.profitInUSD}</td>

                <td>
                  {" "}
                  {JSON.parse(userData.balance).map((balance) => {
                    return (
                      <item key={balance.address} id={balance.address}>
                        <img
                          class="coins"
                          height="30px"
                          width="30px"
                          src={
                            Tokenimagelink + `${balance.address.toLowerCase()}`
                          }
                        />
                      </item>
                    );
                  })}
                </td>

                <td > {userData.valueInETH}</td>
                <td >{userData.valueInUSD}</td>
                <td >{<Stock address={userData.address} />}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
});
