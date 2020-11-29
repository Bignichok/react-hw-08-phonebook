import React from "react";
import PropTypes from "prop-types";
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import { connect } from "react-redux";

import { getFilteredContacts } from "../../redux/phoneBookSelectors";

import ContactsListItem from "./ContactListItem/ContactListItem";

import styles from './ContactList.module.css'



const ContactList = ({ contacts }) => {
  return <TransitionGroup component='ul' className={`${styles.contactList} `}>
        {contacts.map(({ id }) => (
              <CSSTransition  key={id}
              timeout={250}
              classNames={styles}>
            <ContactsListItem id={id}/>
              </CSSTransition>
    )
  )}
        </TransitionGroup>;
};


const mapStateToProps = (state) => ({contacts: getFilteredContacts(state)})

ContactList.defaultProps = {
  contacts: [],
  onDeleteContact: () => {},
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};

export default connect(mapStateToProps,null)(ContactList)

