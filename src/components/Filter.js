
import React, { useState, useEffect } from "react";
import selectfilter from '../Icons/selectfilter.png'
import { APIEnpoint } from "../config";
import { observer } from "mobx-react";
import {fundsStorage}from "../models/fundsStorage";
import styled from 'styled-components'
import options from "./options";

import Select from "react-select";


function Filter() {
    const [Show,setShow]=useState(false);
    const [open, setOpen] = useState(false);
    const [sortType, setSortType]=useState();
        const [userData, setUserData] = useState([]);
   
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
width: 500px;
  height: 300px;
  box-sizing : border-box;
  border: 7px solid linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  background:#0076B6;
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
  margin: 0 0 20px;
  font-weight: 400;
  color: #000066;
}
form {
    width:450px;
    padding-top: 25px;
    padding-left: 25px;
    padding-bottom: 25px;
    padding-right: 25px;
  
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    background: #0076B6;
       
  }
  select{
    height: 40px;
    width: 400px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #32213e;
    outline: none;
    background:#fff;
    color:#000066;
    font-family: Bahnschrift;
    border-radius: 4px;
    font-weight: 800;
  }
  `
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleCross = () => {
    setShow(false);
  };

  const modalClose = () => {
    setShow(false)
    

  }
 
  const selectedValue = (input)=>{
    const selected = fundsStorage.SmartFunds.filter((userData) => {
    return userData.includes(input);
     } );
     if ( input.length ===0){
       setUserData(fundsStorage.SmartFunds);
     }
     else setUserData(selected);
  }










    return (
        <>
        <div style={{ marginTop:"-5px",cursor:"pointer"}}>
             &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <a style={{cursor:"pointer", borderRadius:"20px", color:"#fff",marginTop:"-5px", padding: "10px 20px 10px 10px", display:"inline",  fontWeight:"bold", fontFamily :"Segoe UI", fontSize:"15px",
        backgroundColor: "#008AD8"}} onClick={()=>setShow(true)}><img style={{marginRight:"5px" , marginLeft:"5px", height:"20px", marginTop:"-5px"}} src={selectfilter} />Select Filters</a></div>
        
        {Show ? (
        <Background >
          
          <ModalWrapper >
          
          <ModalContent>
          <form >
          <a onClick={modalClose} style={{float:'right', cursor:'pointer', width:'10px', height:'10px', color:'#fff'}} class="close">&times;</a>
            <h2>Select Asset<h5></h5></h2>
            <div>
              
            <Select
       
        closeMenuOnSelect={false}
        
        options={options}
        
      />

       
    </div>
               
                 
            <a style={{float:'left',background: '#004C75', marginLeft:'',marginTop:'40px' ,fontFamily:'Bahnschrift',fontSize:'20px', paddingLeft:'10px', paddingTop: '15px', paddingRight: '10px',paddingBottom: '15px', borderRadius:'4px', color:'#fff'}} type="submit" 
           onClick="">Apply</a>
          </form>
          </ModalContent>
            </ModalWrapper>
        </Background>
      ) : null}
    
    
      
        
        </>
    )
}
        export default Filter
