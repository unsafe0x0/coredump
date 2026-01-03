"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

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
			type="button"
			onClick={handleThemeToggle}
			className="text-foreground/80 hover:text-foreground"
		>
			{theme === "dark" ? <BiSun size={22} /> : <BiMoon size={22} />}
		</button>
	);
};

export default ToggleTheme;
