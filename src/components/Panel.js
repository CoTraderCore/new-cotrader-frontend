import React, {useState}  from 'react'
import '../stylesheet/panel.css'
import rangefilter from '../Icons/rangefilter.png'
export default  function Panel(){
    const [show, setShow]=useState(false);
    
        

    return (
        
 <div style={{marginTop:"-40px"}}>
        
      <a style={{marginLeft:'350px', marginTop:"", borderRadius:"10px", color:"#fff",fontFamily :"Microsoft YaHei Light", fontSize:"15px",fontWeight:"bold", padding: "10px 20px 10px 20px",
    backgroundColor: "#008AD8"}}  class= "show"onClick={()=>setShow(!show)} >Filter</a>
      
      
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