import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { APIEnpoint } from "../config";
import "./Nav.css";

export function Packs() {
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
    <div class="layout">
      <h2>
        <strong> Browse & Deposit </strong>
        <a id="GFG" class="grad" href="#">
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
      <table>
        <thead>
          <tr>
            <th scope="col-sm-2"> Name </th>
            <th scope="col-sm-1"> Profit In ETH </th>
            <th scope="col-sm-2"> Profit In USD </th>
            <th scope="col-sm-1"> Top Assets </th>
            <th scope="col-sm-1"> Value In ETH </th>
            <th scope="col-sm-1"> Value In USD </th>

            <th scope="col-sm-1"> Version </th>
          </tr>
        </thead>

        <tbody>
          {userData.result &&
            userData.result.map((userData) => (
              <tr key={userData.name}>
                <td><NavLink to={"/fund/"+userData.address}>{userData.name}</NavLink></td>
                <td> {userData.profitInETH}</td>
                <td>{userData.profitInUSD}</td>

                <td>
                  {" "}
                  {JSON.parse(userData.balance).map((balance) => {
                    return (
                      <item key={balance.address} id={balance.address}>
                        <img
                          height="30px"
                          width="30px"
                          src={`https://token.enzyme.finance/${balance.address}`}
                        />
                      </item>
                    );
                  })}
                </td>

                <td> {userData.valueInETH}</td>
                <td>{userData.valueInUSD}</td>
                <td>{userData.version}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
