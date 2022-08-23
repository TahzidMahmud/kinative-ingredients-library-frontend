import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { headerSlice } from "./headerSlice";
import { footerSlice } from "./footerSlice";

import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [footerSlice.name]: footerSlice.reducer,
      [headerSlice.name]: headerSlice.reducer,
    },
    devTools: true,
  });

export const AppStore = () => makeStore;
export const AppState = () => AppStore["getState"];

export const wrapper = createWrapper(makeStore);
