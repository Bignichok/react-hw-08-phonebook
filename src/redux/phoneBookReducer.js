import { contactsAPI } from "../api/api";

import { LOGOUT_SUCCESS } from "./authReducer";

const FETCH_CONTACTS_START = "FETCH_CONTACTS_START";
const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

const ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST";
const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS";
const ADD_CONTACT_ERROR = "ADD_CONTACT_ERROR";

const DELETE_CONTACT_REQUEST = "DELETE_CONTACT_REQUEST";
const DELETE_CONTACT_SUCCESS = "DELETE_CONTACT_SUCCESS";
const DELETE_CONTACT_ERROR = "DELETE_CONTACT_ERROR";

const CHANGE_FILTER = "CHANGE_FILTER";
const TOGGLE_ERROR = "TOGGLE_ERROR";
const TOGGLE_LOADING = "TOGGLE_LOADING";

const fetchContactsStart = () => ({ type: FETCH_CONTACTS_START });

const fetchContactsSuccess = (contacts) => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: {
    contacts,
  },
});

const failureRequest = (error) => ({
  type: FETCH_FAILURE,
  payload: {
    error,
  },
});

const addContactRequest = () => ({ type: ADD_CONTACT_REQUEST });

const addContactSuccess = ({ id, name, number }) => ({
  type: ADD_CONTACT_SUCCESS,
  payload: {
    contact: { id, name, number },
    showError: false,
  },
});

const addContactError = (error) => ({
  type: ADD_CONTACT_ERROR,
  payload: {
    error,
  },
});

const deleteContactRequest = () => ({ type: DELETE_CONTACT_REQUEST });

const deleteContactSuccess = (id) => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: {
    id,
  },
});

const deleteContactError = (error) => ({
  type: DELETE_CONTACT_ERROR,
  payload: {
    error,
  },
});

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  payload: {
    filter,
  },
});

export const toggleError = (showError) => ({
  type: TOGGLE_ERROR,
  payload: {
    showError,
  },
});

const toggleLoading = (loading) => ({
  type: TOGGLE_LOADING,
  payload: {
    loading,
  },
});

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsStart());
  dispatch(toggleLoading(true));

  contactsAPI
    .getContacts()
    .then((data) => {
      dispatch(fetchContactsSuccess(data));
      dispatch(toggleLoading(false));
    })
    .catch((error) => dispatch(failureRequest(error)));
};

export const addContact = (name, number) => (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(addContactRequest());
  contactsAPI
    .addContact(name, number)
    .then((data) => {
      dispatch(addContactSuccess(data));
      dispatch(toggleLoading(false));
    })
    .catch((error) => dispatch(addContactError(error)));
};

export const deleteContact = (id) => (dispatch) => {
  deleteContactRequest();
  contactsAPI
    .deleteContact(id)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch((error) => dispatch(deleteContactError(error)));
};
const initialState = {
  contacts: [],
  filter: "",
  showError: false,
  loading: false,
  error: {},
};

const phoneBookReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, ...payload.contacts],
      };

    case FETCH_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case ADD_CONTACT_SUCCESS:
      const newContact = {
        id: payload.contact.id,
        name: payload.contact.name,
        number: payload.contact.number,
      };
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };

    case ADD_CONTACT_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== payload.id),
      };

    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        filter: payload.filter,
      };

    case TOGGLE_ERROR:
      return {
        ...state,
        showError: payload.showError,
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default phoneBookReducers;
