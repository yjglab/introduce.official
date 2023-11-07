import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  data: {
    isSignIn: boolean;
    accessToken: string;
    refreshToken: string;
  };
}

const initialState: AuthState = {
  data: {
    isSignIn: false,
    accessToken: "",
    refreshToken: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SIGN_IN: (state: AuthState, action) => {
      state.data.accessToken = action.payload.accessToken;
      state.data.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.data.accessToken);
      state.data.isSignIn = true;
    },
    SIGN_OUT: (state: AuthState) => {
      state.data.accessToken = "";
      state.data.refreshToken = "";
      localStorage.setItem("accessToken", "");
      state.data.isSignIn = false;
    },
  },
});

export const { SIGN_IN, SIGN_OUT } = authSlice.actions;
