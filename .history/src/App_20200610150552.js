import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import FourOhFourPage from "./pages/404";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function App() {
  let history = useHistory();
  const [user, setUser] = useState(useSelector((state) => state.user));
  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
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
