import { createSlice } from "@reduxjs/toolkit";

const state = {
  description: {},
  formStap: 0,
};
export const formSlice = createSlice({
  name: "todos",
  initialState: state,
  reducers: {
    changeStap: (state, action) => {
      state.formStap = action.payload;
    },
    addDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

// this is for dispatch
export const { addDescription, changeStap } = formSlice.actions;

// this is for configureStore
export default formSlice.reducer;
