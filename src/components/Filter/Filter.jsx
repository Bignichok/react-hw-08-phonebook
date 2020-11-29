import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {changeFilter} from '../../redux/phoneBookReducer'
import { getVisibilityFilter } from "../../redux/phoneBookSelectors";

import styles from "./Filter.module.css";

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div className={`${styles.wrp} basic`}>
      <label className={styles.filterLabel}>
        Find Contacts by name
         </label> 
        <input 
          className={styles.filterInput}
          type="text"
          value={filter}
          onChange={(e) => onChangeFilter(e.target.value)}
          /> 
    </div>
  );
};

Filter.defaultProps = {
  onChangeFilter: () => {},
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func,
  filter: PropTypes.string,
};

const mapStateToProps = (state) =>  ({
    filter : getVisibilityFilter(state)
  })


const mapDispatchToProps = (dispatch) =>  ({
    onChangeFilter: (filter)=>dispatch(changeFilter(filter))
  })


export default connect(mapStateToProps,mapDispatchToProps)(Filter);
