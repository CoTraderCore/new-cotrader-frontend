import React, {useState, useEffect} from 'react'

import {fundsStorage}from "../models/fundsStorage";
import styled from 'styled-components'
export default function Filter(){
  const [userData, setUserData] = useState([]);
  const [selectColumn , setSelectColumn] = useState('');
  const [selectAction, setSelectAction] = useState('');
  const [searchInput, setSearchInput]= useState('');
  const [Show,setShow]=useState(false)

  const Background = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
     top: 0;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  `
  
  
  const ModalWrapper = styled.div`
  width: 600px;
    height: 200px;
    box-sizing : border-box;
    
    background:#e9ebff;
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
  h2 {
    
    font-weight: 400;
    color: #fff;
    display: flex;
    margin-left: 60px;
    margin-top:20px;
  }      
  span {
    
    display: block;
    padding: 0 0 5px;
  
    
  }
  
  input{
    height: 30px;
  width: 330px;
  padding: 10px;
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
  `
  const modalClose = () => {
      setShow(false)
     
  
    }
    
  
  const handleOpen = () => {
      setShow(true);
    };
  const filteredfunds = (searchInput)=>{
    const filtereddata =fundsStorage.SmartFunds.filter((userData)=>{
  switch(selectColumn, selectAction){
case('USD', 'greaterthan'):
return userData.valueInUSD > searchInput;

case('USD', 'lessthan'):
return userData.valueInUSD < searchInput;

case('USD', 'equal'):
return userData.valueInUSD.includes.searchInput;

case('BNB', 'greaterthan'):
return userData.valueInETH > searchInput;

case('BNB', 'lessthan'):
return userData.valueInETH < searchInput;

case('BNB', 'equal'):
return userData.valueInETH.includes.searchInput;

  }
   
  })
  if(searchInput.length === 0 ){
    setUserData(fundsStorage.SmartFunds);
  
  }
  else setUserData(filtereddata);
  }
  

  return(
    <div>
    <a id="GFG" class="grad"  style={{}} onClick={() => {setShow(true)}}>
        
    
  </a>
    {Show ? (
      <Background >
        
        <ModalWrapper >
        
        <ModalContent>
        <a onClick={modalClose} style={{ float:"right", cursor:'pointer',  color:'#fff', marginRight:"20px"}} class="close">&times;</a> 
    <div style={{display: "flex", justifyContent: "center", position: "", boxSizing:"BorderBox", width:"500px", marginLeft:"60px"}}>
    <select onChange ={(e)=>setSelectColumn(e.target.value)} style={{width:"100px", height:"30px", marginRight:"20px", fontFamily:"Segoe UI"}} ><option selected value="">Select</option><option value="USD">USD</option><option value="BNB">BNB</option></select>
    <select onChange ={(e)=>setSelectAction(e.target.value)} style={{width:"100px", height:"30px", marginRight:"20px", fontFamily:"Segoe UI"}}><option selected value="">Select</option><option value="greaterthan">Greater Than</option><option value="lessthan">Less Than</option><option value="equal">Equal</option></select>
    <input  onChange ={(e)=> {setSearchInput(e.target.value);filteredfunds(e.target.value)}} style={{width:"200px", height:"30px", marginTop:"-10px", marginRight:"20px", fontFamily:"Segoe UI", background:"url('../Icons/search.png')"}} minLength ="100" step="100"
      
       type="number" />
    </div>
      </ModalContent>
      </ModalWrapper>
  </Background>
) : null}
      </div>
  
  )

}