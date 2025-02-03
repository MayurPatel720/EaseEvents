import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;
export default authSlice.reducer;
