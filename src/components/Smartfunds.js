import React , {Component} from 'react';
import { APIEnpoint }  from '../config.js'
import {axios} from 'axios'
export function Smartfunds() {

let res =[]
try {
  // Get data from api
  const res =  axios.get(APIEnpoint)
   return res.data.result
  } catch (error) {
       alert(`can't get data`);
     console.error(error);
   }
   return (
    res.data.result.map((item, key) => {
        return(
       <div>
      <table>
     <thead>
         <tr>
             <th>name</th>
             <th> address </th>
             <th>profitInETH</th>
             <th>profitInUSD</th>
             <th> valueInETH</th>
             <th>valueInUSD</th>
             <th>shares</th>
             <th>core asset </th>
             <th> version</th>
         </tr>
     </thead>
     
     <tbody>
     <tr key={key}>
            <td>{item.name}</td>
           <td> {item.address}</td>
           <td> {item.profitInETH}</td>
            <td>{item.profitInUSD}</td>
           <td> {item.valueInETH}</td>
            <td>{item.valueInUSD}</td>
            <td>{item.shares}</td>
            <td> {item.mainAsset} </td>
           <td> {item.version}</td>
        
           </tr>
           </tbody>
        </table>
       </div>
        )})
   )
   
}
   


    
    
 


