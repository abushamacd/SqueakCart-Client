import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
};

const userSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate, setEditTitle, setEditDiscount } = userSlice.actions;

export default userSlice.reducer;
