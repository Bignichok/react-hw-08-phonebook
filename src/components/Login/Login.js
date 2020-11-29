import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";

import styles from "./Login.module.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onLoginFormSubmit(email, password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>login</h3>
        <div>
          <label className={styles.formLabel} htmlFor="loginEmail">
            e-mail
          </label>
          <input
            type="text"
            id="loginEmail"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label className={styles.formLabel} htmlFor="loginPassword">
            password
          </label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  onLoginFormSubmit: login,
};

export default connect(null, mapDispatchToProps)(Login);
