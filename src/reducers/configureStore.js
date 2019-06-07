// this module creates a store that is persisted on the local storage
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";

import rootReducer from "./index"; // this is the normal non-persisted combineReducer

const persistConfig = {
  key: "root",
  storage: FilesystemStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ latency: 0 })
);
export const persistor = persistStore(store);
