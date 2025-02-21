'use client';
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './blog/blogSlice';
import pererencesReducer from './preferences/preferenceSlice';
const store = configureStore({
  reducer: {
    blog:blogReducer,
    userPreferences:pererencesReducer
  },
});
export default store;
