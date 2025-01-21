import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore } from "redux-persist";
import user from "./userReducer";

// Création d'un stockage de type noop pour le SSR
const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive les vérifications pour redux-persist
    }),
});

// Initialisation de redux-persist uniquement côté client
let persistor = null;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}

export { persistor };
export default store;
