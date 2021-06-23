import React,{ useState } from 'react'
import styled from 'styled-components'
import {fundsStorage} from "../../models/fundsStorage";

export default function AdvancedFilters() {
  const [userData, setUserData] =useState([]);
    const [Show,setShow]=useState(false);
    const [l, setL] = useState("");
    const [m, setM] = useState("");
    const [n, setN] = useState("");
    const [s, setS] = useState("");
    const [p, setP] = useState("");
    const [t, setT] = useState("");
    const [k, setK] = useState("");
    const [j, setJ] = useState("");

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

  const resetFilter = (e) => {

    modalClose()
  }
const applyfilter = (e)=>{
  const sortedlist =[...userData].filter((userData)=>{
    return userData.name.toLowerCase().includes(j.toLowerCase()) || 
           userData.owner.toLowerCase().includes(k.toLowerCase()) ||
           userData.valueInETH.includes.t ||   userData.valueInUSD.includes.m ||  userData.profitInETH.includes.n ||
           userData.profitInUSD.includes.l ||  userData.valueInETH.includes.t || userData.mainAsset.toLowerCase().includes(p.toLowerCase())
           || userData.timeCreation.includes.s;
    })
    if (!e){
      setUserData(fundsStorage.SmartFunds)
    }
    else setUserData(sortedlist)
}
return(
 <div style={{marginTop:"-7px"}}>
        <a  id="GFG" class="grad"  style={{}} onClick={() => {setShow(true)}}>
        
        Advanced Filter
      </a>
      


      
      
      {Show ? (
        <Background >
          
          <ModalWrapper >
          
          <ModalContent>
          
          <a onClick={modalClose} style={{ float:"right", cursor:'pointer',  color:'#061161', marginRight:"20px"}} class="close">&times;</a>
          <h4>Filter Smartfunds</h4> 
          <label style={{marginLeft:"60px"}}>Fund Name <br/><input onChange={(e)=>setJ(e.target.value)} type ="string"/></label><br/>
          <label style={{marginLeft:"60px"}} >Manager Address <br/><input onChange={(e)=>setK(e.target.value)} type ="string"/></label><br/>
          <label style={{marginLeft:"60px"}}> Min Value in ETH <br/><input onChange={(e)=>setT(e.target.value)} type ="number"/></label><br/>
          <label style={{marginLeft:"60px"}}> Min Value in USD <br/><input onChange={(e)=>setM(e.target.value)} type ="number" /></label><br/>
          <label style={{marginLeft:"60px"}} > Min Profit in ETH <br/><input onChange={(e)=>setN(e.target.value)} type ="number" /></label><br/>
          <label style={{marginLeft:"60px"}}> Min Profit in USD <br/><input onChange={(e)=>setL(e.target.value)} type ="number"/></label><br/>
          <label style={{marginLeft:"60px"}}>Fund Type <br/><select style={{marginLeft:"0px"}}onChange={(e)=>setP(e.target.value)}><option>All</option><option>ETH</option><option>USD</option></select></label>
          <label style={{marginLeft:"60px"}}>Time Creation <br/><select style={{marginLeft:"0px"}} onChange={(e)=>setS(e.target.value)}><option>All</option><option>Newest</option><option>Oldest</option></select></label>
          <a  onClick={(e)=>resetFilter} style ={{marginLeft:"60px", backgroundColor:"#004b76", color:"#fff", cursor:"pointer",padding:"10px 10px 10px 10px", borderRadius:"10px", fontFamily: "Bahnschrift"}}>Reset Filter </a><a  onClick={(e)=>applyfilter} style ={{marginLeft:"40px", cursor:"pointer", backgroundColor:"#004b76", color:"#fff", padding:"10px 10px 10px 10px", borderRadius:"10px", fontFamily: "Bahnschrift"}}>Apply Filter</a>
          </ModalContent>
            </ModalWrapper>
        </Background>
      ) : null}
    
    </div>
      
      
)
}
