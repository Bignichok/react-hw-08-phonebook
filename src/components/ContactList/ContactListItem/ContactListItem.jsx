import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteContact } from '../../../redux/phoneBookReducer'
import {getContactById} from '../../../redux/phoneBookSelectors'

const ContactsListItem = ({  name, number  , onDeleteContact }) => {
  return (
    <li className={`basic`}> 
      <div>
      <p>
        <span>Name:</span> {name} 
      </p>
      <p>
        <span>Number:</span> {number}
      </p>
      </div>
      <button type="button" onClick={ onDeleteContact}>
      </button>
    </li>
  );
};

ContactsListItem.defaultProps = {
  name: "anonymous",
  number: "888888888",
  onDeleteContact: () => {},
};

ContactsListItem.propTypes = {
 contact: PropTypes.object,
  onDeleteContact: PropTypes.func,
};

const mapStateToProps = (state, { id }) => (getContactById(state,id)) 


const mapDispatchToProps = (dispatch,ownProps)=> {
  return {
    onDeleteContact: ()=> dispatch(deleteContact(ownProps.id)) 
 }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactsListItem)

