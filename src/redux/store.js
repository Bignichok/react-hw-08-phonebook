import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import phoneBookReducers from "./phoneBookReducer";
import loggedInReducer from "./loggedInReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loggedIn: loggedInReducer,
  loading: loadingReducer,
  phoneBook: phoneBookReducers,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
