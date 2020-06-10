import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import FourOhFourPage from "./pages/FourOFour";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector((state) => state.user);
  const ProtectedRoute = (props) => {
    if (user.isAuthenticated) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="App">
      <Switch>
        <ProtectedRoute
          exac
          path="/jobs/:id"
          render={(props) => <Detail {...props} />}
        />
        <Route path="/jobs/" exact={true} component={Jobs} />
        <Route path="/" exact={true} component={Jobs} />

        <Route path="/login" component={Login} />

        <Route component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
