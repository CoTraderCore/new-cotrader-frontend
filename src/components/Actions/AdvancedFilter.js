import { useContext, useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { FundContext } from '../StateContext/Context'
import { APIEnpoint } from "../StateContext/config";
import FundStore from '../StateContext/FundStore'
import "./popup.css"

const AdvancedFilter= ()=>{
    const {userData, setUserData}= useContext(FundContext);
    const [Show,setShow]=useState(false);

const [fundname, setFundName] = useState('')
const [fundowner, setFundOwner] = useState('')
const [ethValue, setETHValue] = useState('')
const [usdValue, setUSDValue] = useState('')
const [ethProfit, setETHProfit] = useState('')
const [usdProfit, setUSDProfit] = useState('')
const [mainAsset, setMainAsset] = useState('')
const [timeCreation, setTimeCreation] = useState('')

   
    

 
const modalClose = () => {
    setShow(false)
     }

     const handleChange =value=>{
       setFundName(value);
       filterfundname(value);
     }
    
  const filtermainasset =(mainAsset)=>{
    const updatedata= userData.filter((userData)=>{
      
      if(mainAsset ==="ETH"){
        return userData.mainAsset.includes("BNB")
      }
      else if(mainAsset ==="USD") { return userData.mainAsset.includes("USD")}
      else return userData;
    })
    
    setUserData(updatedata)

  }
  
  const filterfundowner =(fundowner)=>{
    const updatedata= userData.filter((userData)=>{
      return userData.valueInETH.toLowerCase().includes(fundowner.toLowerCase());
    })
     setUserData(updatedata)
  }

  const filterethvalue =(ethValue)=>{
    const updatedata= userData.filter((userData)=>{
      return userData.valueInETH.toLowerCase().includes(ethValue.toLowerCase());
    })
     setUserData(updatedata)
  }

  const filterusdvalue =(usdValue)=>{
    const updatedata= userData.filter((userData)=>{
      return userData.valueInUSD.toLowerCase().includes(usdValue.toLowerCase());
    })
     setUserData(updatedata)
  }

  const filterusdprofit =(usdProfit)=>{
    const updatedata= userData.filter((userData)=>{
      return userData.profitInUSD.toLowerCase().includes(usdProfit.toLowerCase());
    })
     setUserData(updatedata)
  }

  const filterethprofit =(ethProfit)=>{
    const updatedata= userData.filter((userData)=>{
      return userData.profitInETH.toLowerCase().includes(ethProfit.toLowerCase());
    })
     setUserData(updatedata)
  }

 const filtertime= (timeCreation)=>{
  const updatedata= FundStore.SmartFunds.filter((userData)=>{
      
    if(timeCreation ==="Newest"){
      return FundStore.SmartFunds.slice().sort((a,b)=> {
        return b[userData.timeCreation] - a[userData.timeCreation]
    })
  }
    else return FundStore.SmartFunds.slice().sort((a,b) =>{
      return a[userData.timeCreation] - b[userData.timeCreation]
  })
  })
  
  setUserData(updatedata)
 }
   
    const filterfundname =(value)=>{
      const updatedata= userData.filter((userData)=>{
        return userData.name.toLowerCase().includes(value.toLowerCase());
      })
     setUserData(updatedata)

    }

  
const handleOpen = () => {
    setShow(true);
  };

  

  const resetFilter = () => {
    
    setETHProfit('');
    setETHValue('');
    setFundName('');
    setFundOwner('');
    setMainAsset('');
    setTimeCreation('');
    setUSDProfit('');
    setUSDValue('');
  
   
   setUserData(FundStore.SmartFundsOriginal)
   }

return(
 //<div style={{marginTop:"-7px"}}>
      //  <a  id="GFG" class="grad"  style={{}} onClick={() => {setShow(true)}}>
        
     //   Advanced Filter
    //  </a>
      <div>

	<a   style={{textDecoration:'none',   border:"2px solid #f0eec8", borderRadius:"7px", padding:"6px", backgroundColor:"rgb(238, 238, 248)",cursor:'pointer', color:"#430f58",  fontSize:'16px' ,fontFamily:"Dosis",  }} href="#popup1">Advanced Filter</a>

      
      
    

      <div>
       
      <div id="popup1" class="overlay">
	<div class="popup">
		<h2 style={{color:'#004b76'}}>Filter SmartFund</h2>
		<a class="close"   href="#">&times;</a>
		<div class="content">
		<div class ="row">
            <div class="col-25"><label style={{fontSize:'16px', color:'#004b76' }}>Fund Name</label></div>
            <div class ="col-75"><input class="boxdesign" value={fundname}  onChange={(e) =>{setFundName(e.target.value) ;
       filterfundname(e.target.value) }} type="text"  /></div>
          </div>
          <div class ="row">
            <div class="col-25"><label style={{fontSize:'16px', color:'#004b76' }}>Manager Address</label> </div>
            <div class ="col-75"><input class="boxdesign" value={fundowner} onChange={(e) => {filterfundowner(e.target.value) ;setFundOwner(e.target.value )} } type="string"  /></div>
          </div>
          <div class ="row">
            <div class="col-25"><label style={{fontSize:'16px', color:'#004b76' }} > Min Value in ETH</label> </div>
            <div class ="col-75"><input class="boxdesign" minLength="10" type="number" value={ethValue} onChange={(e) => {filterethvalue(e.target.value);setETHValue(e.target.value)} } /></div>
          </div>
          <div class ="row">
            <div class="col-25"> <label style={{fontSize:'16px', color:'#004b76' }}> Min Value in USD</label> </div>
            <div class ="col-75"><input class="boxdesign" type="number" value={usdValue} onChange={(e) => {filterusdvalue(e.target.value);setUSDValue(e.target.value)}}/></div>
          </div>
          <div class ="row">
            <div class="col-25"><label style={{fontSize:'16px' , color:'#004b76'}}> Min Profit in ETH </label></div>
            <div class ="col-75"><input class="boxdesign"  type="number" value={ethProfit} onChange={(e) => {filterethprofit(e.target.value);setETHProfit(e.target.value)}} /></div>
          </div>
          <div class ="row">
            <div class="col-25"><label style={{fontSize:'16px', color:'#004b76' }}> Min Profit in USD </label></div>
            <div class ="col-75"><input class="boxdesign" type="number"  value={usdProfit} onChange={(e) => {filterusdprofit(e.target.value);setUSDProfit(e.target.value)}}  /></div>
          </div>
          <div class ="row">
            <div class="col-25"> <label style={{fontSize:'16px' , color:'#004b76' }}>Fund Type</label> </div>
            <div class ="col-75"><select class="boxdesign" value={mainAsset} onChange={(e) =>{setMainAsset( e.target.value);filtermainasset(e.target.value)}}>
              <option value=""></option>
              <option value ="ETH">ETH</option>
              <option value ="USD">USD</option>
              </select>
              </div>
          </div>
          <div class ="row">
            <div class="col-25"> <label style={{fontSize:'16px', color:'#004b76' }} >Time Creation</label> </div>
            <div class ="col-75"><select class="boxdesign" value={timeCreation} onChange={(e) => {setTimeCreation(e.target.value);filtertime(e.target.value)}}>
              <option value=""></option>
            <option value="Newest">Newest</option>
            <option value="Oldest" >Oldest</option>
            </select>
            </div>
          </div>
          <div class ="row" style={{marginTop: '15px'}}>
         <a style ={{ fontFamily:'Dosis',fontSize:'20px', backgroundColor:"#004b76",color:"#fff", cursor:"pointer",padding:"7px 7px 7px 7px", borderRadius:"5px"}} onClick={resetFilter} >Reset</a>

          </div>
	
	</div>
</div>
</div>

      
    
  </div>
  </div>  
      
)
}

export default inject('FundStore')(observer(AdvancedFilter));