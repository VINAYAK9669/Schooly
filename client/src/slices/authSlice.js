import { createSlice } from "@reduxjs/toolkit";

// TODO: Define the inital states required for authentication

const initialState = {
  signUpUserDetails: [],
  loggeduserDetails: [],
  profession: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // TODO: Create a action creators
  reducers: {
    setCurrentUser(state, action) {
      console.log(action.payload);
      state.signUpUserDetails = action.payload;
    },
    setLoggedUser(state, action) {
      state.loggeduserDetails = action.payload;
    },
    setProfession(state, action) {
      state.profession = action.payload;
    },
    resetState(state) {
      // Reset the authentication state to the initial state
      state.signUpUserDetails = [];
      state.loggeduserDetails = [];
      state.profession = "";
    },
  },
});

export const { setCurrentUser, setLoggedUser, setProfession, resetState } =
  authSlice.actions;
export default authSlice.reducer;
