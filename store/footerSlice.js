import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  footerData: [],
};
const nam = "";
export const footerSlice = createSlice({
  name: "footer",
  initialState: {
    footerData: [],
  },
  reducers: {
    setFooterState(state, action) {
      // state.footerData = [...state.footerData, action.payload.footerData];
      if (
        state.footerData.forEach((item, index) => {
          if (item.name == action.payload.footerData.name) {
            return true;
          }
        })
      ) {
        console.log(action.payload.footerData.name);
      } else {
        state.footerData = [...state.footerData, action.payload.footerData];
      }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.footer,
      };
    },
  },
});

export const { setFooterState } = footerSlice.actions;

export const selectFooterState = (state) => state.footer.footerData;

export default footerSlice.reducer;
