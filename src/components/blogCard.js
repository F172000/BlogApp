"use client";
import React from "react";
import style from "@/app/blog/blog.module.css";
import { useRouter } from "next/navigation";
import Profile from '@/assets/profile.png';
import Image from "next/image";
export default function BlogCard({ title, content }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${title}`)}
      className={`${style.card} p-4 bg-white rounded-lg shadow-lg`}
    >
      <Image
        width={600}
        height={400}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrwQ6_vCEgGVYlaZ8aevIwlNCQRssgObGew&s"
        alt="postImage"
        className="rounded-lg object-cover"
      />
      <h1 className="text-xl text-black font-semibold">{title}</h1>
      <p className="text-black">{content}</p>
    </div>
  );
}
