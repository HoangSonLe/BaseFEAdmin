/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Primary colors
                primary: {
                    DEFAULT: "#1677ff",
                    50: "#e6f4ff",
                    100: "#bae0ff",
                    200: "#91caff",
                    300: "#69b1ff",
                    400: "#4096ff",
                    500: "#1677ff",
                    600: "#0958d9",
                    700: "#003eb3",
                    800: "#002c8c",
                    900: "#001d66",
                },
                // Secondary brand color
                secondary: {
                    DEFAULT: "#5b5fc7",
                    50: "#f0f1ff",
                    100: "#e0e1ff",
                    200: "#c7c8ff",
                    300: "#a5a7ff",
                    400: "#8285ff",
                    500: "#5b5fc7",
                    600: "#4f52b3",
                    700: "#3e418c",
                    800: "#2e3066",
                    900: "#1f2040",
                },
                // Success colors
                success: {
                    DEFAULT: "#52c41a",
                    50: "#f6ffed",
                    100: "#d9f7be",
                    200: "#b7eb8f",
                    300: "#95de64",
                    400: "#73d13d",
                    500: "#52c41a",
                    600: "#389e0d",
                    700: "#237804",
                    800: "#135200",
                    900: "#092b00",
                },
                // Warning colors
                warning: {
                    DEFAULT: "#faad14",
                    50: "#fffbe6",
                    100: "#fff1b8",
                    200: "#ffe58f",
                    300: "#ffd666",
                    400: "#ffc53d",
                    500: "#faad14",
                    600: "#d48806",
                    700: "#ad6800",
                    800: "#874d00",
                    900: "#613400",
                },
                // Error colors
                error: {
                    DEFAULT: "#ff4d4f",
                    50: "#fff1f0",
                    100: "#ffccc7",
                    200: "#ffa39e",
                    300: "#ff7875",
                    400: "#ff4d4f",
                    500: "#f5222d",
                    600: "#cf1322",
                    700: "#a8071a",
                    800: "#820014",
                    900: "#5c0011",
                },
                // Neutral colors for light mode
                light: {
                    bg: {
                        primary: "#ffffff",
                        secondary: "#f5f5f5",
                        tertiary: "#f0f0f0",
                    },
                    text: {
                        primary: "#000000e0",
                        secondary: "#00000073",
                        tertiary: "#00000040",
                        disabled: "#00000026",
                    },
                    border: {
                        DEFAULT: "#d9d9d9",
                        light: "#f0f0f0",
                    },
                    divider: "#f0f0f0",
                    hover: "#f5f5f5",
                },
                // Neutral colors for dark mode
                dark: {
                    bg: {
                        primary: "#141414",
                        secondary: "#1f1f1f",
                        tertiary: "#2a2a2a",
                    },
                    text: {
                        primary: "#ffffffd9",
                        secondary: "#ffffff73",
                        tertiary: "#ffffff40",
                        disabled: "#ffffff26",
                    },
                    border: {
                        DEFAULT: "#434343",
                        light: "#303030",
                    },
                    divider: "#303030",
                    hover: "#1f1f1f",
                },
            },
            fontSize: {
                xs: "0.75rem", // 12px
                sm: "0.875rem", // 14px
                base: "1rem", // 16px
                lg: "1.125rem", // 18px
                xl: "1.25rem", // 20px
                "2xl": "1.5rem", // 24px
                "3xl": "1.875rem", // 30px
                "4xl": "2.25rem", // 36px
                "5xl": "3rem", // 48px
            },
            borderRadius: {
                none: "0",
                sm: "2px",
                DEFAULT: "4px",
                md: "6px",
                lg: "8px",
                xl: "12px",
                "2xl": "16px",
                full: "9999px",
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                DEFAULT: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
                md: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
                lg: "0 8px 16px 0 rgba(0, 0, 0, 0.16)",
                xl: "0 12px 24px 0 rgba(0, 0, 0, 0.2)",
                inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
                none: "none",
                "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
                dark: "0 2px 8px 0 rgba(0, 0, 0, 0.6)",
                "dark-md": "0 4px 12px 0 rgba(0, 0, 0, 0.7)",
                "dark-lg": "0 8px 16px 0 rgba(0, 0, 0, 0.8)",
                "dark-xl": "0 12px 24px 0 rgba(0, 0, 0, 0.9)",
            },
            spacing: {
                0: "0",
                1: "4px",
                2: "8px",
                3: "12px",
                4: "16px",
                5: "20px",
                6: "24px",
                8: "32px",
                10: "40px",
                12: "48px",
                16: "64px",
                20: "80px",
                24: "96px",
                32: "128px",
            },
        },
    },
    plugins: [],
};
