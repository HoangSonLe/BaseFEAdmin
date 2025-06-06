import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./", // Use relative paths for assets
    server: {
        port: 3000, // Set default port to 3000
        open: true, // Automatically open browser when starting dev server
        strictPort: true, // If port is already in use, exit instead of trying another port
    },
    build: {
        outDir: "dist", // Output directory for build files
        assetsDir: "assets", // Directory for assets within outDir
        emptyOutDir: true, // Empty outDir before building
        sourcemap: false, // Disable sourcemaps for production
        minify: true, // Minify output
        cssMinify: true, // Minify CSS
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router-dom"],
                    antd: ["antd", "@ant-design/icons"],
                },
            },
        },
    },
});
