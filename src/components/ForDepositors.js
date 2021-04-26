import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { APIEnpoint } from "../config";


import "./Nav.css";
import Stock from './Stock';

export function ForDepositors() {
  const [userData, setUserData] = useState({});
 

  useEffect(() => {
    console.log('Hello')
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(APIEnpoint);
    const jsonData = await response.json();
    console.log(jsonData)
    setUserData(jsonData);
  };

 

  return (
    <div class="layout ">
      <h2>
        <strong> Browse & Deposit </strong>
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
      <input id=" filter" class="pl-10 block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border border-gray-700 
      focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm" type="text" value="" />{"  "}<label id=" filter" class="filter" value="">Filters</label>
      <label id="sort" class ="sort"value="sortby"></label>Sort by: <select class="pl-10 block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border border-gray-700 
      focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm" >
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
      <table class="w-full">
        <thead>
          <tr>
            <th title="Toggle SortBy" colspan="1"  > Name </th>
            <th title="Toggle SortBy" colspan="1"  > Growth In ETH </th>
            <th  title="Toggle SortBy" colspan="1" > Growth In USD </th>
            <th  title="Toggle SortBy" colspan="1" > Top Assets </th>
            <th title="Toggle SortBy" colspan="1" > Value In ETH </th>
            <th title="Toggle SortBy" colspan="1" > Value In USD </th>

            <th title="Toggle SortBy" colspan="1"  > 7d </th>
          </tr>
        </thead>

        <tbody>
          {userData.result &&
            userData.result.map((userData) => (
              <tr colspan="1" key={userData.name}>
                <td colspan="1" ><NavLink to={"/fund/"+userData.address}>{userData.name}</NavLink></td>
                <td colspan="1"> {userData.profitInETH}</td>
                <td colspan="1">{userData.profitInUSD}</td>

                <td colspan="1">
                  {" "}
                  {JSON.parse(userData.balance).map((balance) => {
                    return (
                      <item key={balance.address} id={balance.address}>
                       
      
                        <img class="coins"
                          height="30px"
                          width="30px"

                         src={`https://token.enzyme.finance/${(balance.address).toLowerCase()}`}
                        />
                      </item>
                    );
                  })}
                </td>

                <td colspan="1"> {userData.valueInETH}</td>
                <td colspan="1">{userData.valueInUSD}</td>
                <td colspan="1">{<Stock address={userData.address}/>}</td>
              </tr>
            ))}
        </tbody>
           </table>
          
    </div>
  );
}
