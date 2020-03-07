import React from 'react';
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi"
import NotFound from "../error/NotFound";
import { Route, Switch } from "react-router-dom";
import CustomerList from '../customers/CustomerList';
import SaveCustomer from '../customers/SaveCustomer';
import SaveCar from '../cars/SaveCar';
import CarDetailList from '../cars/CarDetailList';
function App() {
  return (
    <div>
      <Container>
        <Navi/>
        <Switch>
          <Route path="/" exact component = {Dashboard}></Route>
          <Route path="/customers" component = {CustomerList}></Route>
          <Route path="/cars" component = {CarDetailList}></Route>
          <Route path="/save-customer" component = {SaveCustomer}></Route>
          <Route path="/save-car" component = {SaveCar}></Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
