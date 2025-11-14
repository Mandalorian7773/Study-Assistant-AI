import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper MIME types
    rollupOptions: {
      output: {
        // Ensure proper chunking
        manualChunks: undefined,
      },
    },
    // Ensure proper asset handling
    assetsInlineLimit: 4096,
  },
  // Ensure proper MIME types for module scripts
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
