import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  view: {
    state: false,
    data: null,
  },
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setView: (state, action) => {
      state.view.state = action.payload.state;
      state.view.data = action.payload.data;
    },
  },
});

export const { setCollapsed, setView } = siteSlice.actions;

export default siteSlice.reducer;
