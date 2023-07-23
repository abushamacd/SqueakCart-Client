import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  tag: [],
  color: [],
  productImages: [],
};

const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setUploadImages: (state, action) => {
      state.productImages = [...state.productImages, action.payload];
    },
    setDeleteImages: (state, action) => {
      state.productImages = action.payload;
    },
    clearImage: (state, action) => {
      state.productImages = [];
    },
  },
});

export const {
  setCategory,
  setTag,
  setColor,
  setUploadImages,
  setDeleteImages,
  clearImage,
} = userSlice.actions;

export default userSlice.reducer;
