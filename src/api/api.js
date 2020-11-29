import Axios from "axios";

const BASE_URL = "https://goit-phonebook-api.herokuapp.com/";

const instance = Axios.create({
  baseURL: BASE_URL,
});

export const contactsAPI = {
  getContacts() {
    return instance.get(`contacts`).then((resp) => resp.data);
  },
  addContact(name, number) {
    return instance
      .post(`contacts`, { name, number })
      .then((resp) => resp.data);
  },
  deleteContact(id) {
    return instance.delete(`contacts/${id}`).then((resp) => resp);
  },
};

export const authAPI = {
  createNewUser(name, email, password) {
    return instance
      .post(`/users/signup`, { name, email, password })
      .then((resp) => resp.data);
  },
  login(email, password) {
    return instance
      .post(`/users/login`, { email, password })
      .then((resp) => resp.data);
  },
  logout() {
    return instance.post(`/users/logout`);
  },
  getCurrentUser() {
    return instance.get(`/users/current`);
  },
};
