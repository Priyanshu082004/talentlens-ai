import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@animations": path.resolve(__dirname, "./src/animations"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layouts":path.resolve(__dirname,"./src/layouts")
    },
  },

  build: {
    rollupOptions: {
      output: {
       manualChunks(id) {
  if (id.includes("node_modules")) {
    if (
      id.includes("react") ||
      id.includes("react-dom") ||
      id.includes("react-router-dom")
    ) {
      return "vendor-react";
    }

    if (
      id.includes("@reduxjs/toolkit") ||
      id.includes("react-redux")
    ) {
      return "vendor-redux";
    }

    if (id.includes("framer-motion")) {
      return "vendor-motion";
    }

    if (id.includes("gsap")) {
      return "vendor-gsap";
    }

    if (id.includes("axios")) {
      return "vendor-axios";
    }
  }
},
      },
    },

    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5174,

    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});