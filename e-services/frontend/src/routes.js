import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import newBucket from "./pages/newBucket";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/new-bucket" component={newBucket} />
      </Switch>
    </BrowserRouter>
  );
}
