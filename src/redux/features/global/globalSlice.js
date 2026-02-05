import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLeftSidebar: false,
  showChangePasswordModal: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setShowLeftSidebar: (state, action) => {
      state.showLeftSidebar = action.payload;
    },
    setShowChangePasswordModal: (state, action) => {
      state.showChangePasswordModal = action.payload;
    },
  },
});

export const { setShowLeftSidebar, setShowChangePasswordModal } =
  stateSlice.actions;

export default stateSlice.reducer;
