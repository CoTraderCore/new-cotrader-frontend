import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FundProvider } from './components/StateContext/Context'
import FundStore from './components/StateContext/FundStore';
import { Provider } from 'mobx-react';
ReactDOM.render(
  <Provider FundStore={FundStore}> <FundProvider ><App /></FundProvider></Provider>
 
  
    
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
