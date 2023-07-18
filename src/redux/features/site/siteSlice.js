import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = siteSlice.actions;

export default siteSlice.reducer;
