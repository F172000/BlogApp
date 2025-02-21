"use client";
import Link from "next/link";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import SignIn from "@/app/auth/page";
export default function Home() {
 const { theme } = useSelector((state) => state.userPreferences);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme !== theme) {
      dispatch(toggleTheme()); 
    }
  }, [dispatch, theme]);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SignIn/>
    </div>
  );
}
