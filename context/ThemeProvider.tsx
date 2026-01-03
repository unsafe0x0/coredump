"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: string;
	enableSystem?: boolean;
}

export function ThemeProvider({
	children,
	defaultTheme = "system",
	enableSystem = true,
}: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme={defaultTheme}
			enableSystem={enableSystem}
		>
			{children}
		</NextThemesProvider>
	);
}
