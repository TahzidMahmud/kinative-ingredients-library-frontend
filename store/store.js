import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { footerSlice } from "./footerSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [footerSlice.name]: footerSlice.reducer,
    },
    devTools: true,
  });

export const AppStore = () => makeStore;
export const AppState = () => AppStore["getState"];
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

export const wrapper = createWrapper(makeStore);
