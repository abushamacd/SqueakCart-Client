import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  date: "",
  visibility: "published",
  blogImages: [],
};

const userSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setVisibility: (state, action) => {
      state.visibility = action.payload;
    },
    setUploadImages: (state, action) => {
      state.blogImages = [...state.blogImages, action.payload];
    },
    setDeleteImages: (state, action) => {
      state.blogImages = action.payload;
    },
  },
});

export const {
  setCategory,
  setDate,
  setVisibility,
  setUploadImages,
  setDeleteImages,
} = userSlice.actions;

export default userSlice.reducer;
