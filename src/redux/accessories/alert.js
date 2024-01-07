import { createSlice } from "@reduxjs/toolkit";

export const alert = createSlice({
  name: "Powiadomienie",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alert.actions;
