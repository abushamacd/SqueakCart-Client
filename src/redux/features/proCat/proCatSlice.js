import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proCatImages: [],
};

const userSlice = createSlice({
  name: "proCat",
  initialState,
  reducers: {
    setUploadImages: (state, action) => {
      state.proCatImages = [...state.proCatImages, action.payload];
    },
    setDeleteImages: (state, action) => {
      state.proCatImages = action.payload;
    },
    clearImage: (state, action) => {
      state.proCatImages = [];
    },
  },
});

export const { setUploadImages, setDeleteImages, clearImage } =
  userSlice.actions;

export default userSlice.reducer;
