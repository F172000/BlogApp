"use client"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/blog/action";

export default function useFetchPosts() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return { posts, loading, error };
}
