import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Set default port to 3000
        open: true, // Automatically open browser when starting dev server
        strictPort: true, // If port is already in use, exit instead of trying another port
    },
});
