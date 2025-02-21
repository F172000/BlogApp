"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = [
        {
          id: 1,
          title: "First",
          content: "This is my first post",
        },
        {
          id: 2,
          title: "Second",
          content: "This is my second post",
        },
        {
          id: 3,
          title: "Third",
          content: "This is my third post",
        },
      ];
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
