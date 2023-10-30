import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  data: {
    isSignIn: boolean;
    accessToken: string;
  };
}

const initialState: AuthState = {
  data: {
    isSignIn: false,
    accessToken: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SIGN_IN: (state: AuthState, action: PayloadAction<string>) => {
      state.data.accessToken = action.payload;
      localStorage.setItem("at", state.data.accessToken);
      state.data.isSignIn = true;
    },
    SIGN_OUT: (state: AuthState) => {
      state.data.accessToken = "";
      localStorage.setItem("at", "");
      state.data.isSignIn = false;
    },
  },
});

export const { SIGN_IN, SIGN_OUT } = authSlice.actions;
