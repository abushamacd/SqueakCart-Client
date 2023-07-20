import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  view: {
    viewState: false,
    editState: false,
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
      state.view.viewState = action.payload.state;
      state.view.data = action.payload.data;
    },
    setEdit: (state, action) => {
      state.view.editState = action.payload.state;
      state.view.data = action.payload.data;
    },
  },
});

export const { setCollapsed, setView, setEdit } = siteSlice.actions;

export default siteSlice.reducer;
