import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  totalCost: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.products = action.payload.products;
      state.totalCost = action.payload.totalCost;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
