import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  tag: [],
  color: [],
  productImages: [],
  limit: 15,
  page: 1,
  sortBy: "createdAt",
  sortOrder: "desc",
  meta: {},
  searchTerm: "",
  queryCat: null,
  queryBrand: null,
  queryStatus: null,
  queryColor: null,
  minPrice: null,
  maxPrice: null,
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
    setQueryCat: (state, action) => {
      state.queryCat = action.payload;
    },
    setQueryBrand: (state, action) => {
      state.queryBrand = action.payload;
    },
    setQueryStatus: (state, action) => {
      state.queryStatus = action.payload;
    },
    setQueryColor: (state, action) => {
      state.queryColor = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
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
  setQueryCat,
  setQueryBrand,
  setQueryStatus,
  setQueryColor,
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
} = userSlice.actions;

export default userSlice.reducer;
