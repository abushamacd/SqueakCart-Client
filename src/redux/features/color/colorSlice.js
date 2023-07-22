import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  internalColor: "#38b5fe",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setInternalColor: (state, action) => {
      state.internalColor = action.payload;
    },
  },
});

export const { setInternalColor } = colorSlice.actions;

export default colorSlice.reducer;
