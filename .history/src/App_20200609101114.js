import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import FourOhFourPage from "./pages/404";

function App() {
  const [user, setUser] = useState(true);
  const ProtectedRoute = (props) => {
    alert("aaaa");
    if (user === true) {
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
          // component={Detail}
        />
        {/* <Route path="/jobs/:id" component={Detail} /> */}
        <Route path="/jobs" exact={true} component={Jobs} />
        <Route path="/login" component={Login} />
        <Route path="/" exact={true} component={Jobs} />
        <Route path="*" exact={true} component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
