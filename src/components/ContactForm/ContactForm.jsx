import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {addContact, toggleError} from '../../redux/phoneBookReducer'
import { getContacts } from "../../redux/phoneBookSelectors";

import styles from "./ContactForm.module.css";

class ContactForm extends Component {
  static defaultProps = {
    onAddContact: () => {},
  };

  static propTypes = {
    onAddContact: PropTypes.func,
  };

  state = {
    name: "",
    number: "",
  };

  inputChangeHandler = ({ target }) => {
    const {name,value} = target
    this.setState({
      [name]:value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const { name, number } = this.state
    const {contacts,onToggleError,onAddContact} = this.props
    this.setState({name:'',number:''})
    if (contacts && contacts.some((contact) => contact.name === name)) {
      onToggleError(true)
      setTimeout(()=> onToggleError(false),3000)
    } else {
      onAddContact(name, number)
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className={`${styles.phoneBookForm} basic`}>
        <label htmlFor="formName" className={styles.formLabel}> 
          Name
          <input
            className={styles.formInput}
            required
            id="formName"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.inputChangeHandler}
          />
        </label>
        <label htmlFor="formNumber" className={styles.formLabel}>
          Number
          <input
            className={styles.formInput}
            id="formNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="number"
            value={this.state.number}
            required
            onChange={this.inputChangeHandler}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: getContacts(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    onAddContact: (name, number) => dispatch(addContact(name, number)),
    onToggleError: (error)=> dispatch(toggleError(error))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactForm);
