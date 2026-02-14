import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLeftSidebar: false,
  showChangePasswordModal: false,
  showSocialLinkModal: false,
  showAddStaffModal: false,
  showAddBranchModal: false,
  showAddSuperBranchModal: false,
  showAddBranchStaffModal: false,
  showDWLimitModal: false,
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
    setShowSocialLinkModal: (state, action) => {
      state.showSocialLinkModal = action.payload;
    },
    setShowAddStaffModal: (state, action) => {
      state.showAddStaffModal = action.payload;
    },

    setShowAddBranchModal: (state, action) => {
      state.showAddBranchModal = action.payload;
    },
    setShowAddSuperBranchModal: (state, action) => {
      state.showAddSuperBranchModal = action.payload;
    },

    setShowAddBranchStaffModal: (state, action) => {
      state.showAddBranchStaffModal = action.payload;
    },
    setShowDWLimitModal: (state, action) => {
      state.showDWLimitModal = action.payload;
    },
  },
});

export const {
  setShowLeftSidebar,
  setShowChangePasswordModal,
  setShowAddBranchModal,
  setShowAddBranchStaffModal,
  setShowAddStaffModal,
  setShowAddSuperBranchModal,
  setShowDWLimitModal,
  setShowSocialLinkModal,
} = stateSlice.actions;

export default stateSlice.reducer;
