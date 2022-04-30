import { createSlice } from "@reduxjs/toolkit";
import { reload } from "firebase/auth";

const initialState = {
  uid: "",
  reload: false
};

export const uidSlice = createSlice({
  name: "uid",
  initialState: initialState,
  reducers: {
    updateUID: (state, action) => {
      state.uid = action.payload;
    },
    resetProfileData: (state) => {
      return (state = initialState);
    },
    reloadProf: (state, action) => {
      state.reload = action.payload
    }
  },
});

export const { resetProfileData, updateUID, reloadProf } =
  uidSlice.actions;

export default uidSlice.reducer;
