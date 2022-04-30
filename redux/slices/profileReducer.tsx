import { createSlice } from "@reduxjs/toolkit";
import Images from "../../assets";

const initialState = {
  name: "",
  image: Images.placeholderImage,
  address: "",
  university: Images.universityIcon,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    editProfile: (state, action) => {
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.address = action.payload.address;
      state.university = action.payload.university;
    },
    resetProfileData: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return (state = initialState);
    },
  },
});

export const { editProfile, resetProfileData } = profileSlice.actions;

export default profileSlice.reducer;
