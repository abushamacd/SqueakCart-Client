import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  tag: [],
  color: [],
  productImages: [],
  limit: 20,
  page: 1,
  sortBy: "createdAt",
  sortOrder: "desc",
  meta: {},
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
    clearImage: (state) => {
      state.productImages = [];
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setMeta: (state, action) => {
      state.meta = action.payload;
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
  setLimit,
  setPage,
  setSortBy,
  setSortOrder,
  setMeta,
} = userSlice.actions;

export default userSlice.reducer;
