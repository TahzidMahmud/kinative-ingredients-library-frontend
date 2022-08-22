import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./footerSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper < AppStore > makeStore;
