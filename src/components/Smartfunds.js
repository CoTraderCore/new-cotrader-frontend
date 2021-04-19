import React , { useState, useEffect } from 'react';
import {APIEnpoint} from '../config'
import './Nav.css';

export function Smartfunds() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(APIEnpoint);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  return (
    <div > 
      
        <h1><strong> Browse & Deposit </strong><a id ="GFG"class="grad" href="#" > My Deposits </a></h1>
        <div class="container-fluid">
        <a id ="GFG" href=""> Browse Leaderboard </a>
                  
                
        
                  <a id ="GFG" href=""> Browse All</a>
                
              
                  <a id ="GFG" href=""> My Deposits </a>
                  <hr/>
            </div>
            
            

    <table class="table text-white" >
     <thead>
       <tr>
           <th> Name </th>
           <th> Profit In ETH </th>
           <th> Profit In USD </th>
           <th> Value In ETH </th>
           <th> Value In USD </th>
            <th> Core Asset </th>
           <th> Version </th>
       </tr>
   </thead>
   
   <tbody  >
   {userData.result && userData.result.map(userData => (
    
   <tr key={userData.name}>
          <td>{userData.name}</td>
         <td> {userData.profitInETH}</td>
          <td>{userData.profitInUSD}</td>
         <td> {userData.valueInETH}</td>
          <td>{userData.valueInUSD}</td>
          <td>{userData.mainAsset} </td>
         <td>{userData.version}</td>
      
         </tr>
   ))}
         </tbody>
      </table>
     </div>
  );
}
        
   

   


    
    
 


