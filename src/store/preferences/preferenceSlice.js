'use client';
import { createSlice } from "@reduxjs/toolkit";
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light";
  }
  return "light";
};

const initialState = {
  theme: getInitialTheme(),
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
  },
});

export const { toggleTheme } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
