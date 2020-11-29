import { contactsAPI } from "../api/api";

const FETCH_CONTACTS_START = "FETCH_CONTACTS_START";
const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

const ADD_CONTACT = "ADD_CONTACT";
const DELETE_CONTACT = "DELETE_CONTACT";

const CHANGE_FILTER = "CHANGE_FILTER";
const TOGGLE_ERROR = "TOGGLE_ERROR";
const TOGGLE_LOADING = "TOGGLE_LOADING";

const initialState = {
  contacts: [],
  filter: "",
  showError: false,
  loading: false,
  error: {},
};

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

const addContactSuccess = ({ id, name, number }) => ({
  type: ADD_CONTACT,
  payload: {
    contact: { id, name, number },
    showError: false,
  },
});

const deleteContactSuccess = (id) => ({
  type: DELETE_CONTACT,
  payload: {
    id,
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
  contactsAPI
    .addContact(name, number)
    .then((data) => {
      dispatch(addContactSuccess(data));
      dispatch(toggleLoading(false));
    })
    .catch((error) => dispatch(failureRequest(error)));
};

export const deleteContact = (id) => (dispatch) => {
  contactsAPI
    .deleteContact(id)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch((error) => dispatch(failureRequest(error)));
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

    case ADD_CONTACT:
      const newContact = {
        id: payload.contact.id,
        name: payload.contact.name,
        number: payload.contact.number,
      };
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== payload.id),
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

    default:
      return state;
  }
};

export default phoneBookReducers;
