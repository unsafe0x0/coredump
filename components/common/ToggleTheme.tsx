"use client";
import React, { useState, useEffect } from "react";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="text-foreground/80 hover:text-foreground"
    >
      {theme === "dark" ? <BiSun size={22} /> : <BiMoon size={22} />}
    </button>
  );
};

export default ToggleTheme;
