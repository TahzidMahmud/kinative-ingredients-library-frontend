import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  headerData: [],
};
const nam = "";
export const headerSlice = createSlice({
  name: "header",
  initialState: {
    headerData: [],
  },
  reducers: {
    setHeaderState(state, action) {
      // state.headerData = [...state.headerData, action.payload.headerData];
      if (
        state.headerData.forEach((item, index) => {
          if (item && item.name == action.payload.headerData.name) {
            return true;
          }
        })
      ) {
        // don't add
      } else {
        state.headerData = [...state.headerData, action.payload.headerData];
      }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.header,
      };
    },
  },
});

export const { setHeaderState } = headerSlice.actions;

export const selectHeaderState = (state) => state.header.headerData;

export default headerSlice.reducer;
