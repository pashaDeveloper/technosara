

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  color: {},
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {  setColor } = colorSlice.actions;
export default colorSlice.reducer;
