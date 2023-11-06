import { Draft, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  me: object;
}

export const initialState: UserState = {
  me: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_MY_DATA(state: Draft<UserState>, { payload }) {
      state.me = payload.data;
    },
  },
});

export const { SET_MY_DATA } = userSlice.actions;
