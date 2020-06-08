import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";

function App() {
  const [user, setUser] = useState(true);
  const ProtectedRoute = (props) => {
    if (user === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  console.log(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`);
  return (
    <div>
      <Switch>
        <ProtectedRoute
          path="/jobs/:id"
          render={(props) => <Detail {...props} />}
          // component={Detail}
        />
        <Route path="/jobs/:id" component={Detail} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Jobs} />
      </Switch>
    </div>
  );
}

export default App;
