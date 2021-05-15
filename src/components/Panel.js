import React, {useState}  from 'react'
import '../stylesheet/panel.css'

export default  function Panel(){
    const [show, setShow]=useState(false);
    
        

    return (
        <div style={{marginTop:'-31px'}}>
        
    <a style={{marginLeft:'20px', display:'inline'}} class="show" onClick={()=>setShow(!show)} >Filters</a>
      
      
                {  
                show?   

        <div class="row ">    
          
           <div class="leftside">
               <label>Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              
               
                <input  class="slider"type="range" min="1" max="100"  id="myRange"/></div>
                <div class="middle">
                <label>Performance All Time</label>
                
               
            <input class="slider"type="range" min="1" max="100"  id="myRange"/></div>
            <div class="rightside">
            <label>Performance This Month</label>
            
             
            <input class="slider"type="range" min="1" max="100" id="myRange"/></div>
           
            </div>
        
            :null}
            </div>
    
    )
}