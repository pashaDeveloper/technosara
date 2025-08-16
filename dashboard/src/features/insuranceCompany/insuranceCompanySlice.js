

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insuranceCompanies: [],
  insuranceCompany: {},
};

const insuranceCompanySlice = createSlice({
  name: "insuranceCompany",
  initialState,
  reducers: {
    setInsuranceCompanies: (state, action) => {
      state.insuranceCompanys = action.payload;
    },
    setInsuranceCompany: (state, action) => {
      state.insuranceCompany = action.payload;
    },
  },
});

export const { setInsuranceCompanies, setInsuranceCompany } = insuranceCompanySlice.actions;
export default insuranceCompanySlice.reducer;
