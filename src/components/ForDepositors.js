import React, { useState, useEffect, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { APIEnpoint } from "../config";
import { Tokenimagelink } from "../config";
import { walletStore } from "../models/wallet_model";
import {fundsStorage} from "../models/fundsStorage";
import Web3 from "web3";
import { observer } from "mobx-react";
import "../stylesheet/nav.css";

import AdvancedFilters from "./actions/AdvancedFilters"
import Stock from "./Stock";
import CreateNewFund from "./actions/CreateNewFund";
import Panel from "./Panel";
import Filter from "./Filter"
import styled from 'styled-components'
import TablePagination from '@material-ui/core/TablePagination';


export const ForDepositors = observer(() => {
  const [userData, setUserData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pending, setPending] = useState(false);
  const [txCount, setTxCount] = useState(0);
  const [sortType, setSortType] = useState('');
  const [selectColumn , setSelectColumn] = useState('');
  const [selectAction, setSelectAction] = useState('');
  const [searchInput, setSearchInput]= useState('');
  const [val, setVal] = useState("");
  const [address, setAddress] = useState("");
  const [ethvalue, setETHvalue] = useState("");
  const [usdvalue, setUSDvalue] = useState("");
  const [ethprofit, setETHprofit] = useState("");
  const [usdprofit, setUSDprofit] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [Show,setShow]=useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  

  useEffect(() => {
    var web3 = new Web3(
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
    );
    walletStore.web3 = web3;
    //console.log(web3.currentProvider);

    const getFetch = async () => {
      const response = await fetch(APIEnpoint);
      const jsonData = await response.json();
      // console.log(jsonData)

      fundsStorage.initSFList(jsonData.result);
      setUserData(fundsStorage.SmartFunds);
    };

    getFetch();
  }, []);
 
  const updateList = (input) => {
    // console.log(input);
    const filtered = fundsStorage.SmartFunds.filter((userData) => {
      return (
        userData.owner.toLowerCase().includes(input.toLowerCase()) ||
       
        userData.name.toLowerCase().includes(input.toLowerCase()) ||
        userData.profitInETH.toLowerCase().includes(input.toLowerCase()) ||
        userData.profitInUSD.toLowerCase().includes(input.toLowerCase()) ||
        userData.valueInETH.toLowerCase().includes(input.toLowerCase()) ||
        userData.valueInUSD.toLowerCase().includes(input.toLowerCase()) ||
        userData.historyProfitInETH.toLowerCase().includes(input.toLowerCase()) ||
        userData.historyProfitInUSD.toLowerCase().includes(input.toLowerCase()) 
       
      );
    });
    if (input.length === 0) {
      // console.log(mobxStorage.SmartFunds);
      setUserData(fundsStorage.SmartFunds);
    } else setUserData(filtered);
  };

  
    
  const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
   top: 0;
  background:#212E52;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`


const ModalWrapper = styled.div`
width: 450px;
  height: 600px;
  box-sizing : border-box;
  
  background:#adcae6;

  color:#000066;
  display: flex;
  
  border-radius: 12px;
`
const ModalContent = styled.div`
position: relative;

margin-top:15px;
font-family: Bahnschrift;
font-size: 17px;

color:#000066;
h4 {
  
  font-weight: 400;
  color: #000066;
  display: flex;
  margin-left: 60px;
  margin-top:15px;
  margin-bottom:8px;
}      
span {
  
  display: block;
  padding: 0 0 5px;

  
}

input{
  height: 30px;
  width: 330px;
  padding: 5px;
  font-family: Bahnschrift;
  font-weight:400px;
  border: 1px solid #fff;
  outline: none;
  color:#000066;
  background:#fff;
  border-radius: 5px;
  
  
}

select{
  height: 30px;
  width: 330px;
  padding:5px;
  border: 1px solid #fff;
  outline: none;
  background:#fff;
  color:#000066;
  font-family: Bahnschrift;
  border-radius:5px;
  font-weight: 800;
  
  
}
label{
    color:#000066;
    margin-top:-5px;
    font-family: Bahnschrift;
    
}
`
const modalClose = () => {
    setShow(false)
   

  }
  

const handleOpen = () => {
    setShow(true);
  };

  const handleasset = (setType) =>{
  
    const updateddata = fundsStorage.SmartFunds.filter((userData)=>{
      
      switch(setType){
        case ("BNB"):
      return userData.mainAsset === "BNB";
      case ("USD"):
        return userData.mainAsset === "USD";
      default:
        return userData.mainAsset === "BNB" && "USD"
     
   
   } })
   if (setType ==="All" ){setUserData(fundsStorage.SmartFunds)}
   else setUserData(updateddata) 
    
  }

  

  const resetFilter = () => {
   setVal()
  setShow(false)
  setAddress()
  setETHvalue()
  setUSDvalue()
  setETHprofit()
  setUSDprofit()
  
  setUserData(fundsStorage.SmartFunds)
  }

  
const handleinput=(setVal)=>{
  const inputvaluechange = fundsStorage.SmartFunds.filter((userData)=>{
    return userData.name.toLowerCase().includes(setVal)
  })
if (setVal.length === 0){
  setUserData(fundsStorage.SmartFunds)
}else setUserData(inputvaluechange)
}




  const updatePending = (_bool, _txCount) => {
    setPending(_bool);
    setTxCount(_txCount);
  };


  const sortedItems = React.useMemo(() => {
    const sortableItems = [...userData]
    if (sortType !== null) {
      fundsStorage.SmartFunds.sort((a, b) => {
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
 
 

  return (
    <div>
   
      <div style={{ color:"#14044d", height:"50px" , backgroundColor:"#e8e8e8", marginBottom:"20px"}}>
      <h4 style={{  display:"inline",marginTop:"12px",marginLeft:"80px" }}>
        Browse & Deposit
        
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a style={{fontSize:"18px",marginTop:"12px", color:"#14044d" }} id="GFG" href="">
        {" "}
        Browse Leaderboard{" "}
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a style={{fontSize:"18px",marginTop:"12px",  color:"#14044d"}}  id="GFG" href="">
        {" "}
        Browse All
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <CreateNewFund  class ="grad "account={walletStore.account} web3={walletStore.web3} accounts={walletStore.accounts} pending={updatePending}/> 
        
      
        <a id="GFG" class="grad" href="" style={{marginRight:"15px"}}>
          {" "}
           My Deposits{" "}
        </a>
        </h4>
       
        </div>
      
       
      
      
   
    <div>
    
    
   
      
      
      <input
      style={{marginLeft:"80px"}}
         class="search"
          id="filter"
          type="text"
          placeholder="Search Funds"
          onChange={(e) => {
            setKeyword(e.target.value);
            updateList(e.target.value);
          }}
        /> 
    
    
     
     <label><select id = "sortascdesc" style={{ marginRight:"80px"}}  onChange={(e)=>requestSort(e.target.value)}> 
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
     </select></label>
     <div style={{marginTop:"-18px"}}>
        <a  class="grad"  style={{}} onClick={() => {setShow(true)}}>
        
        Advanced Filter
      </a>
      


      
      
      {Show ? (
        <Background >
          
          <ModalWrapper >
          
          <ModalContent>
          
          <a onClick={modalClose} style={{ float:"right", cursor:'pointer',  color:'#061161', marginRight:"20px"}} class="close">&times;</a>
          <h4>Filter Smartfunds</h4> 
          <label style={{marginLeft:"60px"}}>Fund Name <br/><input id="assetname" onChange = {(val)=>{setVal(val);handleinput(val)}}type="text" /></label><br/>
          <label style={{marginLeft:"60px"}} >Manager Address <br/><input  type ="text"/></label><br/>
          <label style={{marginLeft:"60px"}}> Min Value in ETH <br/><input type ="number"/></label><br/>
          <label style={{marginLeft:"60px"}}> Min Value in USD <br/><input type ="number" /></label><br/>
          <label style={{marginLeft:"60px"}} > Min Profit in ETH <br/><input type ="number" /></label><br/>
          <label style={{marginLeft:"60px"}}> Min Profit in USD <br/><input type ="number"/></label><br/>
          <label style={{marginLeft:"60px"}}>Fund Type <br/><select id ="mainasset" value ="type" onChange={(e)=>{setType(e.target.value);handleasset(e.target.value)}} style={{marginLeft:"0px"}}><option  >All</option><option value="ETH">ETH</option><option value="USD">USD</option></select></label>
          <label style={{marginLeft:"60px"}}>Time Creation <br/><select id ="timecreation" onChange={(e)=>setTime(e.target.value)} style={{marginLeft:"0px"}} ><option>All</option><option value="Newest">Newest</option><option value="Oldest">Oldest</option></select></label>
          <a  onClick={resetFilter} style ={{marginLeft:"60px", backgroundColor:"#004b76", color:"#fff", cursor:"pointer",padding:"10px 10px 10px 10px", borderRadius:"10px", fontFamily: "Bahnschrift", marginTop:"20px"}}>Reset Filter </a><a onClick={modalClose}  style ={{marginLeft:"40px", cursor:"pointer", backgroundColor:"#004b76", color:"#fff", padding:"10px 10px 10px 10px", borderRadius:"10px", fontFamily: "Bahnschrift", marginTop:"20px"}}>Apply Filter</a>
          </ModalContent>
            </ModalWrapper>
        </Background>
      ) : null}
    
    </div>
     <Panel />
   </div>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
      <div style={{marginTop:"40px"}} >
     
      
      

        <table class="layout">
          <thead>
            <tr>
            <th>Owner</th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('name')}  >Name</th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('profitInETH')}>Growth In ETH </th>

              <th class="wh" style={{cursor:"pointer"}} onClick={() => requestSort('profitInUSD')}  > Growth In USD </th>
              <th class="wh"  >Top Assets </th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('valueInETH')}  >Value In ETH </th>
              <th class="wh"style={{cursor:"pointer"}} onClick={() => requestSort('valueInUSD')}  > Value In USD </th>
             <th class="wh"  style={{cursor:"pointer"}} onClick={() => requestSort('historyProfitInETH')}  >History Profit-ETH</th>
             <th  class="wh"  style={{cursor:"pointer"}} onClick={() => requestSort('historyProfitInUSD')}  >History Profit-USD</th>
             <th>Main Asset</th>
              <th class="wh"> 7d </th>
            </tr>
          </thead>

          <tbody >
            {userData &&
              userData.map((userData) => (
                <tr key={userData.name}>
                <td>{userData.owner.slice(0, -34)+"..." }</td>
                  <td  >
                    <NavLink
                      style={{ fontFamily:"Bahnschrift",fontSize: "13.5px" ,color: "#14044d"}}
                      to={"/fund/" + userData.address}
                    >
                      {userData.name}
                    </NavLink>
                  </td>
                  <td> {userData.profitInETH.slice(0, -10) }</td>  
                              <td>{userData.profitInUSD.slice(0, -10)}</td>

                  <td >
                    {" "}
                    {JSON.parse(userData.balance).map((balance) => {
                       
                      return (
                        <item key={balance.address} id={balance.symbol}>
                         
                          <img
                           autocomplete="false"
                           
                            class="coins"
                            style={{border: "1px solid #693C5E", borderRadius:"15px" , backgroundColor:"#fff"}}
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

                  <td> {userData.valueInETH.slice(0, -10) } </td>
                  <td>{userData.valueInUSD.slice(0, -10) }</td>
                  <td>{userData.historyProfitInETH.slice(0, -15)}</td>
                  <td>{userData.historyProfitInUSD.slice(0, -15)}</td>
                  <td>{userData.mainAsset}</td>
                  
                  <td>{<Stock address={userData.address} />}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          style={{marginRight:"80px"}}
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
       
      </div>
    </div>
   
  );
});
