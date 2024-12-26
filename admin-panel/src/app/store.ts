import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./features/user/userSlice";
import systemReducer from "./features/system/systemSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedSystemReducer = persistReducer(persistConfig, systemReducer);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
  },
  //? To fix the error, we need to add the serializableCheck option to the middleware configuration.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
      ignoredActions: [
        "persist/PERSIST",
        "persist/REHYDRATE",
        "persist/REGISTER",
      ]
    }
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
