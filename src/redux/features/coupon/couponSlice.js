import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate, setEditTitle, setEditDiscount } = couponSlice.actions;

export default couponSlice.reducer;
