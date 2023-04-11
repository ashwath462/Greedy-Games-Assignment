import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
  reducer: {
    data: rootReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});
