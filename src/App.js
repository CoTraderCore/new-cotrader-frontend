import logo from './logo.svg';
import './App.css';
import { createContext } from "react";
import FundStore from './components/StateContext/FundStore'
import React from 'react'

import { observer, inject } from 'mobx-react';
import Context from './components/StateContext/Context';


function App() {
  
  return (
    
      <Context/>
    
  );
}

export default inject('FundStore')(observer(App));
