import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./Slice/FormSlice";

export default configureStore({
  reducer: {
    form: FormSlice,
  },
});
