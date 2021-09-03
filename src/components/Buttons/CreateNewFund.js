import React,{ useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  APIEnpoint,
  SmartFundRegistryABIV9,
  SmartFundRegistryADDRESS,
} from '../StateContext/config.js' 
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import  styled from 'styled-components'
import setPending from '../../utils/setPending'

import axios from 'axios'
import { Checkbox } from '@material-ui/core';
import info from '../Images/info.png'
import { observer, inject } from "mobx-react";


const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const USD_ADDRESS = '0xe9e7cea3dedca5984780bafc599bd69add087d56'

const CreateNewFund =(props)=> {
  
  
  const [Show,setShow]=useState(false)
  const [Percent,setPercent]=useState(20)
  const [FundAsset,setFundAsset]=useState('BNB')
  const [FundName,setFundName]=useState('')
  const [TradeVerification,setTradeVerification]=useState(true)
  const [open, setOpen] = useState(false);
  
  function Alert(props) {
    
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
   setOpen(true);
  };

  const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
   top: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  `
const ModalWrapper = styled.div`
max-width:400px;

  color:#000066;
  display:flex;
  box-sizing : border-box;
opacity: 1;
margin-top: 0px;
visibility: visible;
`
const ModalContent = styled.div`

padding : 20px;
background-color: #a2a8d3;
color:#fff;
margin: 70px auto;
position: relative;
border-radius: 8px;
box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

input, select{
  width: 100%;
  padding: 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  height:25px;
  color:#000066;
  background:#fff;
  margin-bottom:3px;
  font-family: Calibri;
fontSize:13px;
}



`

//box-shadow: 0 0 12px #ffcc00;

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

  

  const createNewFund = async () =>{
  if(Percent > 0 && Percent <= 30){
  const contract = new props.web3.eth.Contract(SmartFundRegistryABIV9, SmartFundRegistryADDRESS)
    if(FundName !== ''){
      try{
        const name = FundName
        const percent = Percent * 100 // MUL Percent by 100
        const verifiacton = TradeVerification
        const block = await props.web3.eth.getBlockNumber()
        const coreAsset = FundAsset === "BNB" ? ETH_ADDRESS : USD_ADDRESS

        console.log(name, percent, coreAsset, verifiacton, FundAsset)

        // get cur tx count
        let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + props.accounts[0])
        txCount = txCount.data.result

        // create fund
        contract.methods.createSmartFund(name, percent, coreAsset, verifiacton)
        .send({ from: props.accounts[0] })
        .on('transactionHash', (hash) => {
        // pending status for DB
        setPending(null, 1, props.accounts[0], block, hash, "SmartFundCreated")
        props.pending(true, txCount+1)
        })
        // close modal
        modalClose()
      }
      catch(e){
        // for case if user reject transaction
        props.pending(false)
        alert('Can not verify transaction data, please try again in a minute')
        console.log("Error", e)
      }
    }else{
    
      
      alert('Please input fund name')
    
    }
  }else{
    alert('Please select correct percent, we support from 0.01% to 30%')
  }
  }

  // helper for set state
 

  const modalClose = () => {
    setShow(false)
    setPercent(20)
    setFundAsset('BNB')
    setFundName('')
    setTradeVerification(true)

  }
  
  
    return (
      <>
      <div>
        <a   onClick={() => {props.account?setShow(true):setOpen(true)} }>
        
        Create Fund
      </a>
      <Snackbar  open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert  onClose={handleClose} severity="info">
      Please Connect Your Account! 
      </Alert>
      </Snackbar>


      
      
      {Show ? (
        <Background >
          
          <ModalWrapper >
          
          <ModalContent>
          <form >
          <a onClick={modalClose} class="close" style={{ float:"right", cursor:'pointer',  color:'#fff', marginLeft:"20px"}}  >&times;</a>
            <h2>Create new fund <h5>(with multi DEX support)</h5></h2>
            <div>
              <input  type="text" name="FundName" onClick={e => setFundName(e.target.value)} placeholder="Fund Name" />
              <div style={{marginBottom:'5px'}}>Performance Fee % <a  data-toggle="popover" data-trigger="focus" title="This is the % the fund manager earns for the profits earned, relative to main fund asset (BNB, USD or COT)." ><img style={{marginLeft: '5px'}}src={info} /></a></div>
              <input type="number" min="1"  max="100 " name="Percent"onClick={e => setPercent(e.target.value)} placeholder="20"  InputProps={{
              
              startAdornment: (
                <InputAdornment position="start">
                  %
                </InputAdornment>
              )
            }}/>
             <div > Main fund asset % <a  data-toggle="popover" data-trigger="focus" title="With the help of this asset, investors will invest, calculate fund value ect" ><img style={{marginLeft: '5px'}}src={info} /></a></div>
              <select id ="createfund" style={{marginTop:"10px"}} type="select" name="FundAsset" onChange={e => setFundAsset(e.target.value)} >
              <option value="BNB" selected>BNB</option>
               <option value="USD">USD</option></select>
                </div>
                <div >Limit Tokens<a  data-toggle="popover" data-trigger="focus" title="This gives investors confidence that even if the trader's key is stolen, the worst a hacker can do is trade to legit tokens, not likely to a token just created by the trader to exit scam the fund, leaving it without value." >  <img style={{marginLeft: '5px'}} src={info} /></a></div>
                <div><Checkbox style={{color:'#fff', float:'left' , display:'inline'}} type="checkbox"
            value="Use trade verifiaction"
            checked={TradeVerification}
            onChange={() => setTradeVerification(!TradeVerification)} /><label style={{marginTop:'6px', paddingLeft:'0px', display:'left'}} value="Use trade verifiaction">Use Trade Verification</label></div>
                 
            <a style={{float:'left',backgroundColor: '#B0C4DE', marginLeft:'-20px',marginTop:'40px' ,fontFamily:'Bahnschrift',fontSize:'18px', padding:"7px 7px 7px 7px", borderRadius:'4px', color:'#fff'}} type="submit" onClick={() => createNewFund()}>Create</a>
          </form>
          </ModalContent>
            </ModalWrapper>
        </Background>
      ) : null}
    
    </div>
      
      </>
    );
  
}

export default inject('FundStore')(observer(CreateNewFund)); 