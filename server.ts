import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure public/images directory exists
  const publicImagesDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  // Static images route
  app.use("/images", express.static(publicImagesDir));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API to get list of available server-saved images
  app.get("/api/server-images", (req, res) => {
    try {
      if (!fs.existsSync(publicImagesDir)) {
        return res.json({ images: [] });
      }
      const files = fs.readdirSync(publicImagesDir);
      res.json({ images: files });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API to save images directly to server filesystem (public/images/)
  // This allows users to upload from the web UI and permanently embed them for all public viewers!
  app.post("/api/save-server-images", (req, res) => {
    try {
      const { images } = req.body; // Expects { [fileNumber or fileName]: dataUrl }
      if (!images || typeof images !== "object") {
        return res.status(400).json({ error: "Invalid images payload" });
      }

      const savedList: string[] = [];

      for (const [key, dataUrl] of Object.entries(images)) {
        if (typeof dataUrl === "string" && dataUrl.startsWith("data:image/")) {
          const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const ext = matches[1].split("/")[1] === "jpeg" ? "jpg" : matches[1].split("/")[1] || "png";
            const buffer = Buffer.from(matches[2], "base64");
            
            // Clean filename
            let filename = key;
            if (!filename.includes(".")) {
              filename = `${key}.${ext}`;
            }
            // Sanitize filename to prevent directory traversal
            filename = path.basename(filename);

            const filePath = path.join(publicImagesDir, filename);
            fs.writeFileSync(filePath, buffer);
            savedList.push(filename);
          }
        }
      }

      res.json({ 
        success: true, 
        message: `${savedList.length} images saved to server permanently`,
        savedFiles: savedList 
      });
    } catch (err: any) {
      console.error("Error saving images to server:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
