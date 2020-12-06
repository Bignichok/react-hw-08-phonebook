import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { getAuthError } from "../../redux/authSelectors";

import styles from "./Login.module.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = ({ target }) => {
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
        {this.props.error && <p>Email or password is incorrect, try again!</p>}
        <div>
          <label className={styles.formLabel} htmlFor="loginEmail">
            e-mail
          </label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            onChange={this.handleChange}
            required
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
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getAuthError(state),
});

const mapDispatchToProps = {
  onLoginFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
