import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Verify from "./Components/Verify";

ReactDOM.render(
  <React.StrictMode>
    <div className="container col-sm-7 col-md-5 col-lg-4 col-xl-3 my-5">
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/verify" component={Verify} />
        </Switch>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
