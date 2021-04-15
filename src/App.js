
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from './components/Layout';
import { Smartfunds } from './components/Smartfunds';
import { FundManagers } from './components/FundManagers';
import { Traders } from './components/Traders';


    export default class App extends Component {
      static displayName = App.name;
    
      render () {
        return (
          
          <BrowserRouter>
          <Layout>
          <switch>
            <Route exact path='/' component={Smartfunds} />
             <Route path='/fundmanagers' component={FundManagers} />
            <Route path='/traders' component={Traders} />
            </switch>
          </Layout>
          </BrowserRouter>
      
        );
      }
    }
    

