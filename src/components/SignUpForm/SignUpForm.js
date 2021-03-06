import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../redux/authReducer";
import { getIsLoading } from "../../redux/loadingSelectors";

import Spinner from "../Spinner/Spinner";

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
            type="email"
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
        {this.props.isLoading ? (
          <Spinner size={25} />
        ) : (
          <button type="submit">Sign up</button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignUpFormSubmit: (name, email, password) => {
    return dispatch(signUp(name, email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
