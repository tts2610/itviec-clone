import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import FourOhFourPage from "./pages/404";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector((state) => state.user);
  const ProtectedRoute = (props) => {
    console.log(user);
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
          path="/jobs/:id"
          render={(props) => <Detail {...props} />}
        />
        <Route path="/" exact={true} component={Jobs} />
        <Route path="/jobs" exact={true} component={Jobs} />
        <Route path="/login" component={Login} />

        <Route path="*" exact={true} component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
