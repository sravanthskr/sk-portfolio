import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "node:url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  define: {
    "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
      process.env.VITE_FIREBASE_API_KEY,
    ),
    "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(
      process.env.VITE_WEB3FORMS_ACCESS_KEY,
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
build: {
  outDir: path.resolve(__dirname, "dist/public"),
  emptyOutDir: true,
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, "client", "index.html"),
      admin: path.resolve(__dirname, "client", "admin.html"),
    },
  },
},
  // In vite.config.ts - Add these optimizations:
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false, // This will hide the error overlay
      // Or configure WebSocket properly:
      clientPort: 5000,
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
