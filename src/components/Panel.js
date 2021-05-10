import React, {useState}  from 'react'
import '../stylesheet/panel.css'
import { Button } from 'react-bootstrap'
export default  function Panel(){
    const [show, setShow]=useState(false);
    
        

    return (
        <div>
            
      {"  "}<a style={{marginLeft:'20px'}}class="show" onClick={()=>setShow(!show)} >Filters</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label style={{marginRight:'0px'}}>Sort by:</label> <select style={{fontFamily:"segoe ui"}}> 
                           <option  value="1">Name (Descending)</option>
                            <option value="2">Name (Ascending)</option>
                            <option selected="3">AUM (Descending)</option>
                            <option value="4">AUM (Ascending)</option>
                            <option value="5">Since Inception (Descending)</option>
                            <option value="6">Since Inception (Ascending)</option>
                            <option value="7">This Month (Descending) </option>
                            <option value="8">This Month (Ascending)</option>
                            <option value="9">24H (Descending)</option>
                            <option value="10">24H (Ascending)</option>
                          
                        </select>
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