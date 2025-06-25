// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  tweet: tweetSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🛡️ important for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
