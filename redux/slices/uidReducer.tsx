import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: ""
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
  },
});

export const { resetProfileData, updateUID } =
  uidSlice.actions;

export default uidSlice.reducer;
