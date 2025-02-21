"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
export default function AdminLayout({ children }) {
  const {  status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  if (status === "loading") return <p>Loading...</p>;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
