import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './logo.png';
import setting from './setting.png';
import option from './option.png';


export class Nav extends Component {
  static displayName = Nav.name;


render () {
    return (
        
        <nav class="navbar navbar-expand-md  text-white mb-3">
    <div class="container">
        
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
            <a tag={Link} id="GFG" class="img" to="/"><img src={logo} class="img" alt='pic'/></a>
                  <a tag={Link} id="GFG" class="header-left"  href="/"> Smartfunds </a>
                  
                
        
                  <a tag={Link} id="GFG" class="header-left"  href="/fundmanagers"> Fund Managers </a>
                
              
                  <a tag={Link} id="GFG" class="header-left"  href="/traders"> Traders </a>
            </div>
            <div class="navbar-nav ml-auto">
                <a tag={Link} id="GFG" href="#" class="header-right">Connect Wallet</a>
                <a tag={Link} id="GFG" href="#" class="header-right"><img src={setting}  alt='settings'/></a>
                <a tag={Link} id="GFG" href="#" class="header-right"><img src={option}  alt='option'/></a>
            </div>
        </div>
    </div>    
</nav>

      
                
              
                  
                
              
          
      

        );
  }
}