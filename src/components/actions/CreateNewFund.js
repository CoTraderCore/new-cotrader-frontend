import React,{ useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  APIEnpoint,
  SmartFundRegistryABIV9,
  SmartFundRegistryADDRESS,
} from '../../config.js' 
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components'
import setPending from '../../utils/setPending'

import axios from 'axios'
import { CloseButton } from 'react-bootstrap';
import { Checkbox, Modal } from '@material-ui/core';
import info from "../../Icons/info.png";
import percent from "../../Icons/percent.png";

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
   background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`


const ModalWrapper = styled.div`
width: 500px;
  height: 650px;
  box-sizing : border-box;
  border: 7px solid linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  background: #fff;
  color:#000066;
  display: flex;
  box-shadow: 0 0 12px #ffcc00;
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
span {
  
  display: block;
  padding: 0 0 5px;

  
}
form {
  padding-top: 25px;
  padding-left: 25px;
  padding-bottom: 25px;
  padding-right: 25px;

  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  background: #fff;
  
  
  
}
input{
  height: 40px;
  width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #32213e;
  outline: none;
  color:#000066;
  background:#fff;
  border-radius: 4px;
  font-weight: 800;
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
        <a id="GFG" class="grad"  onClick={() => {props.account?setShow(true):setOpen(true)} }>
        
        Create Fund
      </a>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info">
      Please Connect Your Account! 
      </Alert>
      </Snackbar>


      
      
      {Show ? (
        <Background
          
            
          
        >
          
          <ModalWrapper >
          
          <ModalContent>
          <form >
          <a onClick={modalClose} style={{float:'right', cursor:'pointer', width:'10px', height:'10px', color:'#000066'}} class="close">&times;</a>
            <h2>Create new fund <h5>(with multi DEX support)</h5></h2>
            <div>
              <input  type="text" name="FundName" onClick={e => setFundName(e.target.value)} placeholder="Fund Name" />
              <div style={{marginBottom:'5px'}}>Performance Fee % <a  data-toggle="popover" data-trigger="focus" title="This is the % the fund manager earns for the profits earned, relative to main fund asset (BNB, USD or COT)." ><img style={{marginLeft: '5px'}}src={info} /></a></div>
              <input type="number" min="1"  max="100 " name="Percent"onClick={e => setPercent(e.target.value)} placeholder="20"  InputProps={{
              
              startAdornment: (
                <InputAdornment position="start">
                  <img src={percent}/>
                </InputAdornment>
              )
            }}/>
             <div > Main fund asset % <a  data-toggle="popover" data-trigger="focus" title="With the help of this asset, investors will invest, calculate fund value ect" ><img style={{marginLeft: '5px'}}src={info} /></a></div>
              <select type="select" name="FundAsset" onChange={e => setFundAsset(e.target.value)} >
              <option value="BNB" selected>BNB</option>
               <option value="USD">USD</option></select>
                </div>
                <div >Limit Tokens<a  data-toggle="popover" data-trigger="focus" title="This gives investors confidence that even if the trader's key is stolen, the worst a hacker can do is trade to legit tokens, not likely to a token just created by the trader to exit scam the fund, leaving it without value." >  <img style={{marginLeft: '5px'}} src={info} /></a></div>
                <div><Checkbox style={{color:'#000066', float:'left' , display:'inline'}} type="checkbox"
            value="Use trade verifiaction"
            checked={TradeVerification}
            onChange={() => setTradeVerification(!TradeVerification)} /><label style={{marginTop:'6px', paddingLeft:'0px', display:'left'}} value="Use trade verifiaction">Use Trade Verification</label></div>
                 
            <a style={{float:'left',background: '#000066', marginLeft:'-20px',marginTop:'40px' ,fontFamily:'Bahnschrift',fontSize:'20px', paddingLeft:'10px', paddingTop: '15px', paddingRight: '10px',paddingBottom: '15px', borderRadius:'4px', color:'#fff'}} type="submit" onClick={() => createNewFund()}>Create</a>
          </form>
          </ModalContent>
            </ModalWrapper>
        </Background>
      ) : null}
    
    </div>
      
      </>
    );
  
}

export default CreateNewFund