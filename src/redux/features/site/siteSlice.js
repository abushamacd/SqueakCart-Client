import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  contact: {
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
    setContact: (state, action) => {
      state.contact.state = action.payload.state;
      state.contact.data = action.payload.data;
    },
  },
});

export const { setCollapsed, setContact } = siteSlice.actions;

export default siteSlice.reducer;
