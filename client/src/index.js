import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import Login from "./Components/Login";
import Register from "./Components/Register";
import Verify from "./Components/Verify";
import DisplayUsers from "./Components/DisplayUsers";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/verify" component={Verify} />
          <Route exact path="/display-users" component={DisplayUsers} />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
