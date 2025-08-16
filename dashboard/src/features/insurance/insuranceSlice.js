

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insurances: [],
  insurance: {},
};

const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    setInsurances: (state, action) => {
      state.insurances = action.payload;
    },
    setInsurance: (state, action) => {
      state.insurance = action.payload;
    },
  },
});

export const { setInsurances, setInsurance } = insuranceSlice.actions;
export default insuranceSlice.reducer;
