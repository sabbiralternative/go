import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLeftSidebar: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setShowLeftSidebar: (state, action) => {
      state.showLeftSidebar = action.payload;
    },
  },
});

export const { setShowLeftSidebar } = stateSlice.actions;

export default stateSlice.reducer;
