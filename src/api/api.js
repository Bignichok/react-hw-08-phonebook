import axios from "axios";

const BASE_URL = "https://goit-phonebook-api.herokuapp.com/";

axios.defaults.baseURL = BASE_URL;

export const tokenController = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};
export const contactsAPI = {
  getContacts() {
    return axios.get(`contacts`).then((resp) => resp.data);
  },
  addContact(name, number) {
    return axios.post(`contacts`, { name, number }).then((resp) => resp.data);
  },
  deleteContact(id) {
    return axios.delete(`contacts/${id}`).then((resp) => resp);
  },
};

export const authAPI = {
  createNewUser(name, email, password) {
    return axios
      .post(`/users/signup`, { name, email, password })
      .then((resp) => resp.data);
  },
  login(email, password) {
    return axios
      .post(`/users/login`, { email, password })
      .then((resp) => resp.data);
  },
  logout() {
    return axios.post(`/users/logout`);
  },
  getCurrentUser() {
    return axios.get(`/users/current`);
  },
};
