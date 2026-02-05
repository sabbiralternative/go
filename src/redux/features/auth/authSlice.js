import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken: null,
  adminName: null,
  adminRole: null,
  adminSite: null,
  readOnly: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { adminToken, adminName, adminRole, adminSite, readOnly } = payload;
      state.adminToken = adminToken;
      state.adminName = adminName;
      state.adminRole = adminRole;
      state.adminSite = adminSite;
      state.readOnly = readOnly;
    },
    logout: (state) => {
      localStorage.clear();
      state.adminToken = null;
      state.adminName = null;
      state.adminRole = null;
      state.adminSite = null;
      state.readOnly = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
export const userToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.user;
