/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";
import AuthReducer from "./Reducers/AuthReducer";

export default configureStore({
  reducer: {
    UserReducer: UserReducer,
    auth: AuthReducer,
  },
});
