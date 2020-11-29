import React from 'react';
import { connect } from 'react-redux';

import { toggleError } from '../../redux/phoneBookReducer'

import styles from './Error.module.css'

const Error=({closeHandler})=>  {
return (
        <div className={styles.error}>
        <button onClick={()=>closeHandler(false)}></button>
        <p>Contact is already existed</p>
        </div>
        );
    
}

const mapDispatchToProps = (dispatch) => {
return {
        closeHandler:(showError)=> dispatch(toggleError(showError))
        }    
}



export default connect(null, mapDispatchToProps)(Error);