import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

// Define theme types
export type ThemeMode = "light" | "dark";

// Define the context type
interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
    setTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Initialize theme from localStorage or default to 'light'
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem("theme");
        return (savedTheme as ThemeMode) || "light";
    });

    // Update the theme in localStorage and apply CSS class when theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);

        // Apply or remove the 'dark' class to/from the document element
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Set theme explicitly
    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
    };

    // Define Ant Design theme based on current theme mode
    const antdThemeConfig = {
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
            colorPrimary: "#1677ff",
            borderRadius: 6,
            // Add more token overrides as needed
        },
        components: {
            // Component-specific theme overrides
            Layout: {
                siderBg: theme === "dark" ? "#141414" : "#ffffff",
                headerBg: theme === "dark" ? "#141414" : "#ffffff",
                bodyBg: theme === "dark" ? "#141414" : "#f0f0f0",
            },
            Menu: {
                darkItemBg: "#141414",
                darkItemColor: "rgba(255, 255, 255, 0.85)",
                darkItemHoverBg: "#1f1f1f",
                darkItemSelectedBg: "#1677ff",
            },
            Card: {
                colorBorderSecondary: theme === "dark" ? "#303030" : "#f0f0f0",
            },
            Button: {
                colorBgTextHover:
                    theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
            },
        },
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};
