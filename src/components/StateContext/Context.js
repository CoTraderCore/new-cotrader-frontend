
import Table from "../FundListTable/Table";
import { createContext } from "react";
import Card from "../FundPageCard/Card";
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, inject } from 'mobx-react';

 const FundContext = createContext();

function FundProvider() {
  const [userData, setUserData] = React.useState([])
 const FundStore = {userData, setUserData}
	 
  return (
    <FundContext.Provider value={FundStore}>
    <Router>
    <Switch>
      <Route exact path="/" component={Table} />
      
      <Route path="/fund/:address" render={(props)=><Card {...props}/>} />
      </Switch>
      </Router>
  </FundContext.Provider>
  );
}
const FundConsumer = FundContext.Consumer
export { FundProvider, FundConsumer, FundContext }
export default inject('FundStore')(observer(FundProvider));