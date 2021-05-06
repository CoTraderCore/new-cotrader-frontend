import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APIEnpoint } from "../config";
import { Tokenimagelink } from "../config";
import { walletStore, mobxStorage } from "../models/wallet_model";
import Web3 from "web3";
import { observer } from "mobx-react";
import "../stylesheet/nav.css";
import Stock from "./Stock";
import CreateNewFund from './actions/CreateNewFund'

export const ForDepositors = observer(() => {
  const [userData, setUserData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pending, setPending] = useState(false);
  const [txCount, setTxCount] = useState(0);

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

      mobxStorage.initSFList(jsonData.result);
      setUserData(mobxStorage.SmartFunds);
    };

    getGitHubUserWithFetch();
 
  }, []);

  const updateList = (input) => {
    // console.log(input);
    const filtered = mobxStorage.SmartFunds.filter((userData) => {
      return userData.name.toLowerCase().includes(input.toLowerCase());
    });
    if (input.length === 0) {
      // console.log(mobxStorage.SmartFunds);
      setUserData(mobxStorage.SmartFunds);
    } else setUserData(filtered);
  };

  const updatePending = (_bool, _txCount) => {
    setPending(_bool)
    setTxCount(_txCount)
  }

  return (
    <div class="layout ">
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
      <a id="GFG" href="">
        {" "}
        Browse All
      </a>
      <a id="GFG" href="">
        {" "}
        My Deposits{" "}
      </a>
      <hr />
      <input
        id=" filter"
        class="pl-10 block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border border-gray-700 
      focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
          updateList(e.target.value);
        }}
      />
      <CreateNewFund account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/>
      {"  "}
      <label id=" filter" class="filter" value="">
        Filters
      </label> 
      <label id="sort" class="sort" value="sortby"></label>Sort by:{" "}
      <select
        class="pl-10 block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border border-gray-700 
      focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
      >
        <option value="1">Name (Descending)</option>
        <option value="2">Name (Ascending)</option>
        <option selected="3">AUM (Descending)</option>
        <option value="4">AUM (Ascending)</option>
        <option value="5">Since Inception (Descending)</option>
        <option value="6">Since Inception (Ascending)</option>
        <option value="7">This Month (Descending) </option>
        <option value="8">This Month (Ascending)</option>
        <option value="9">24H (Descending)</option>
        <option value="10">24H (Ascending)</option>
      </select>
      <table>
        <thead>
          <tr>
            <th scope="col"> Name </th>
            <th scope="col"> Growth In ETH </th>
            <th scope="col"> Growth In USD </th>
            <th scope="col"> Top Assets </th>
            <th scope="col"> Value In ETH </th>
            <th scope="col"> Value In USD </th>

            <th scope="col"> 7d </th>
          </tr>
        </thead>

        <tbody>
          {userData &&
            userData.map((userData) => (
              <tr key={userData.name}>
                <td scope="row">
                  <NavLink to={"/fund/" + userData.address}>
                    {userData.name}
                  </NavLink>
                </td>
                <td scope="row"> {userData.profitInETH}</td>
                <td scope="row">{userData.profitInUSD}</td>

                <td scope="row">
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

                <td scope="row"> {userData.valueInETH}</td>
                <td scope="row">{userData.valueInUSD}</td>
                <td scope="row">{<Stock address={userData.address} />}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});
