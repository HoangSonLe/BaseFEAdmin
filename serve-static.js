import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const DIST_DIR = path.join(__dirname, "dist");

const MIME_TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "font/otf",
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);

    // Handle root path
    let filePath =
        req.url === "/" ? path.join(DIST_DIR, "index.html") : path.join(DIST_DIR, req.url);

    // Get the file extension
    const extname = path.extname(filePath);

    // Default content type
    let contentType = MIME_TYPES[extname] || "application/octet-stream";

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file doesn't exist, try serving index.html (for SPA routing)
            if (err.code === "ENOENT") {
                fs.readFile(path.join(DIST_DIR, "index.html"), (err, content) => {
                    if (err) {
                        res.writeHead(404);
                        res.end("File not found");
                        return;
                    }

                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content, "utf-8");
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
            return;
        }

        // Success
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${DIST_DIR}`);
});
