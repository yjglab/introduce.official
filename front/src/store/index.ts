import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slice";
import { authSlice } from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
