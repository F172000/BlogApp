'use client';
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
     const posts= [
        {
          "id": 1,
          "title": "first",
          "content": "This is my first post"
        },
        {
          "id": 2,
          "title": "second",
          "content": "This is my Second post"
        },
        {
          "id": 3,
          "title": "third",
          "content": "This is my Third post"
        }
      ]
      const data = await posts.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
