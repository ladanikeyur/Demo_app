import { createSlice } from "@reduxjs/toolkit";

const state = {
  description: {},
  formStap: 0,
  loeading: false,
};
export const formSlice = createSlice({
  name: "todos",
  initialState: state,
  reducers: {
    changeStap: (state, action) => {
      state.formStap = action.payload;
    },
    loeading: (state, action) => {
      state.loeading = action.payload;
    },
    addDescription: (state, action) => {
      state.description = action.payload;
    },
    removeDescription: (state, action) => {
      state.description = {};
    },
  },
});

// this is for dispatch
export const { addDescription, changeStap, loeading, removeDescription } =
  formSlice.actions;

// this is for configureStore
export default formSlice.reducer;
