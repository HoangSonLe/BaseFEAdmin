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

    // Get CSS variables for current theme
    const getCssVar = (name: string) => {
        return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
    };

    // Define Ant Design theme based on current theme mode
    const antdThemeConfig = {
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
            colorPrimary: getCssVar("primary-color"),
            borderRadius: 6,
            // Add more token overrides as needed
        },
        components: {
            // Component-specific theme overrides
            Layout: {
                siderBg: theme === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)",
                headerBg: theme === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)",
                bodyBg: theme === "dark" ? "var(--dark-bg-secondary)" : "var(--light-bg-secondary)",
                colorBgLayout:
                    theme === "dark" ? "var(--dark-bg-secondary)" : "var(--light-bg-secondary)",
            },
            Menu: {
                darkItemBg: getCssVar("dark-bg-primary"),
                darkItemColor: getCssVar("dark-text-primary"),
                darkItemHoverBg: getCssVar("dark-hover-bg"),
                darkItemSelectedBg: getCssVar("primary-color"),
            },
            Card: {
                colorBorderSecondary: getCssVar("border-light"),
            },
            Button: {
                colorBgTextHover:
                    theme === "dark" ? "var(--dark-hover-bg)" : "var(--light-hover-bg)",
            },
        },
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};
