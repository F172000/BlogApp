"use client";
import React, { useEffect, useState } from "react";
import useFetchPosts from "@/hooks/useFetchPosts";
import dynamic from "next/dynamic";
const BlogCard = dynamic(() => import('@/components/blogCard'), { loading: () => <p>Loading...</p> });
export default function Page() {
  const { posts, loading, error } = useFetchPosts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
 
  if (!mounted) return <div className="h-screen w-screen bg-white" />;
 if(error) return <p>Something went wrong</p>;
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((item) => (
            <BlogCard key={item.id} title={item.title} content={item.content} />
          ))}
        </div>
      )}
    </div>
  );
}
