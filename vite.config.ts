import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  // Make builds robust even if the current working directory differs (e.g. Vercel)
  root: rootDir,
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(rootDir, "index.html"),
    },
  },
  plugins: [react(), ...(env.command === "serve" ? [expressDevPlugin()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client"),
      "@shared": path.resolve(rootDir, "shared"),
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

      // Dynamic import to avoid affecting production builds
      import("./server")
        .then(({ createServer }) => {
          const app = createServer();
          server.middlewares.use(app);
        })
        .catch((err) => {
          console.warn("Failed to load express server for dev:", err);
        });
    },
  };
}
