"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function Page() {
  const { title } = useParams();
  console.log(title, "slug>>>>>>>");
  const [post, setPost] = useState(null);
  console.log(post, "post>>>>>>>>");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!title) return;
    async function getPost() {
      try {
        const res = await fetch(`https://blog-app-phi-sand.vercel.app/api/${title}`);
        if (!res.ok) throw new Error(`HTTP error ! status: ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [title]);
  if (loading) return <div>Loading...</div>;
  if (!post) return <p>Post not found.</p>;
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
}
