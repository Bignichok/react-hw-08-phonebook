import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import { getCurrentUser } from "./redux/authReducer";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

import "./App.css";
import Spinner from "./components/Spinner/Spinner";

const Header = lazy(() => import("./components/Header/Header"));
const PhoneBook = lazy(() => import("./components/PhoneBook/PhoneBook"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const SignUpForm = lazy(() => import("./components/SignUpForm/SignUpForm"));
const Login = lazy(() => import("./components/Login/Login"));

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    return (
      <div className="App">
        <Suspense fallback={<Spinner size={150} />}>
          <Header />

          <Switch>
            <PublicRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/phoneBook" component={PhoneBook} />
            <PublicRoute restricted path="/login" component={Login} />
            <PublicRoute restricted path="/signup" component={SignUpForm} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
