"use client";
import React from "react";
import { toggleTheme } from "@/store/preferences/preferenceSlice";
import { signOut, useSession } from "next-auth/react";
import { useDispatch,useSelector } from "react-redux";
const Navbar = () => {
  const { theme } = useSelector((state) => state.userPreferences);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center mb-4 p-2">
      <h1 className="text-3xl">Blog Listings</h1>
      <h2 className="text-xl">Welcome to the Blog, {session?.user?.email}!</h2>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 border rounded"
        >
          {theme === "light"
            ? "Switch to Dark Mode 🌙"
            : "Switch to Light Mode ☀️"}
        </button>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
