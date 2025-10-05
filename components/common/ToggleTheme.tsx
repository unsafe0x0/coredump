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
      className="p-3 bg-card rounded-md text-foreground/80 hover:text-foreground hover:bg-card/80"
    >
      {theme === "dark" ? (
        <BiSun className="text-xl" />
      ) : (
        <BiMoon className="text-xl" />
      )}
    </button>
  );
};

export default ToggleTheme;
