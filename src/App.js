import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
// import Header from "./components/Header/Header";
const Header = lazy(() => import("./components/Header/Header"));
const PhoneBook = lazy(() => import("./components/PhoneBook/PhoneBook"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const SignUpForm = lazy(() => import("./components/SignUpForm/SignUpForm"));
const Login = lazy(() => import("./components/Login/Login"));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<div>loading...</div>}>
          <Header />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/phoneBook" component={PhoneBook} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUpForm} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
