'use client';
import { createSlice } from "@reduxjs/toolkit";
import {fetchPosts} from './action';
const postSlice = createSlice({
    name: "posts",
    initialState: {
      posts: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default postSlice.reducer;