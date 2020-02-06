import React from 'react';
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi"
import NotFound from "../error/NotFound";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Container>
        <Navi/>
        <Switch>
          <Route path="/" exact component = {Dashboard}></Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
