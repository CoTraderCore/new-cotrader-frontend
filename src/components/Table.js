import React , {useState, useEffect} from 'react'
import {fundsStorage} from "../models/fundsStorage";
import { APIEnpoint } from "../config";
import { NavLink } from "react-router-dom";
import Stock from "./Stock";
import "../stylesheet/nav.css";
export default function Table(){
        const [userData, setUserData]= useState([]);
      
        useEffect(() => {
    const getFetch = async () => {
        const response = await fetch(APIEnpoint);
        const jsonData = await response.json();
        // console.log(jsonData)
  
        fundsStorage.initSFList(jsonData.result);
        setUserData(fundsStorage.SmartFunds);
      };
  
      getFetch();
    }, [])



        return(
          
          <table>
          

        <tbody>
           {userData &&
              userData.map((userData) => (
                <tr className="text-center mb-3" key={userData.address}>
      
                <td variant="ligth">Fund name: {userData.name}</td>
              
                <td>type: {userData.fundType}</td>
                <td>core asset : {userData.mainAsset}</td> </tr>
              ))}
        </tbody>
        </table>
        )
  }
