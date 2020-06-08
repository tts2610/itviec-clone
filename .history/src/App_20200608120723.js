import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./components/Jobs";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/jobs" component={Jobs} />
      </Switch>
    </div>
  );
}

export default App;
