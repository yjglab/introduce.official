import { Draft, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  accessToken: string;
  data: object;
}

export const initialState: UserState = {
  accessToken: "",
  data: {},
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyInfo(state: Draft<UserState>, { payload }) {
      state.accessToken = payload.accessToken;
      state.data = payload.data;
    },
  },
});

export const { setMyInfo } = user.actions;
export default user;
