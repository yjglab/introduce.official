import { User } from "@/utils/types";
import { Draft, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  authenticated: boolean;
  user: User | null;
}

export const initialState: UserState = {
  authenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER: (state: Draft<UserState>, { payload }) => {
      state.authenticated = true;
      state.user = payload;
    },
    LOGOUT: (state: Draft<UserState>) => {
      state.authenticated = false;
      state.user = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(.pending, (state, { payload }) => {

  //     })
  //     .addCase(.fulfilled, (state, { payload }) => {

  //     })
  //     .addCase(.rejected, (state, { payload }) => {

  //     });
  // },
});

export const { SET_USER, LOGOUT } = userSlice.actions;
