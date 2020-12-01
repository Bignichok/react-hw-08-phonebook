import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from "../../redux/authReducer";

import styles from "./SignUpForm.module.css";

class SignUpForm extends Component {
  state = {
    email: "",
    name: "",
    password: "",
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password } = this.state;
    this.setState({
      email: "",
      name: "",
      password: "",
    });
    this.props.onSignUpFormSubmit(name, email, password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label className={styles.formLabel} htmlFor="emailSignUp">
            e-mail
          </label>
          <input
            type="text"
            id="emailSignUp"
            name="email"
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor="loginSignUp">
            name
          </label>
          <input
            type="text"
            id="loginSignUp"
            name="name"
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor="passwordSignUp">
            password
          </label>
          <input
            type="password"
            id="passwordSignUp"
            name="password"
            onChange={this.handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignUpFormSubmit: (name, email, password) => {
    console.log(name, email, password);
    return dispatch(signUp(name, email, password));
  },
});

export default connect(null, mapDispatchToProps)(SignUpForm);
