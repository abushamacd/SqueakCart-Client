import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandImages: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setUploadImages: (state, action) => {
      state.brandImages = [...state.brandImages, action.payload];
    },
    setDeleteImages: (state, action) => {
      state.brandImages = action.payload;
    },
    clearImage: (state, action) => {
      state.brandImages = [];
    },
  },
});

export const { setUploadImages, setDeleteImages, clearImage } =
  brandSlice.actions;

export default brandSlice.reducer;
