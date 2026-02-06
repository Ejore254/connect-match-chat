import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    ...(env.command === "serve" ? [expressDevPlugin()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressDevPlugin(): Plugin {
  let serverCreated = false;
  return {
    name: "express-dev-plugin",
    apply: "serve",
    configureServer(server) {
      if (serverCreated) return;
      serverCreated = true;

      // Dynamic import to avoid breaking the build
      import("./server").then(({ createServer }) => {
        const app = createServer();
        server.middlewares.use(app);
      }).catch((err) => {
        console.warn("Failed to load express server for dev:", err);
      });
    },
  };
}
