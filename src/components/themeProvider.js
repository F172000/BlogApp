"use client"; 
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/preferences/preferenceSlice";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.userPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme !== theme) {
      dispatch(toggleTheme()); 
    }
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [theme, dispatch]);

  return <>{children}</>;
}
