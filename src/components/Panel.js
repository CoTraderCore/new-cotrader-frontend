import React, {useState}  from 'react'
import '../stylesheet/panel.css'
import rangefilter from '../Icons/rangefilter.png'
export default  function Panel(){
    const [show, setShow]=useState(false);
    
        

    return (
        
 <div style={{marginLeft :"0px"}}>
        
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <a style={{marginLeft:'100px', marginTop:"-5px", borderRadius:"20px", display:'inline', color:"#fff",fontFamily :"Segoe UI", fontSize:"15px",fontWeight:"bold", padding: "10px 20px 10px 10px",
    backgroundColor: "#008AD8"}}  class= "show"onClick={()=>setShow(!show)} ><img style={{marginLeft:"5px", marginRight:"5px",height:"30px", marginTop:"-5px" }} src={rangefilter}/>Range Filter</a>
      
      
                {  
                show?   

        <div class="row ">    
          
           <div class="leftside">
               <label style={{marginLeft:"50px"}}>Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              
               
                <input  class="slider"type="range" min="1" max="100"  id="myRange"/></div>
                <div class="middle">
                <label style={{marginLeft:"50px"}}>Performance All Time</label>
                
               
            <input class="slider"type="range" min="1" max="100"  id="myRange"/></div>
            <div class="rightside">
            <label style={{marginLeft:"50px"}}>Performance This Month</label>
            
             
            <input class="slider"type="range" min="1" max="100" id="myRange"/></div>
           
            </div>
        
            :null}
            </div>
    
    )
}