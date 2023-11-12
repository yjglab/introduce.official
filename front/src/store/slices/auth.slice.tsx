import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  data: {
    on: boolean;
  };
}

const initialState: AuthState = {
  data: {
    on: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SIGN_IN: (state: AuthState) => {
      state.data.on = true;
    },
    SIGN_OUT: (state: AuthState) => {
      state.data.on = false;
    },
  },
});

export const { SIGN_IN, SIGN_OUT } = authSlice.actions;
