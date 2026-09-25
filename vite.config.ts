import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  // Read .env / .env.local so ALLOWED_HOSTS can be changed without editing this file.
  const env = loadEnv(mode, process.cwd(), "");

  // ALLOWED_HOSTS: comma-separated hosts the dev server accepts, e.g.
  //   ALLOWED_HOSTS=.ngrok-free.dev,mysite.example.com
  // A leading dot allows every subdomain. Set to "true" to allow any host.
  const allowedHosts =
    env.ALLOWED_HOSTS?.trim() === "true"
      ? true
      : (env.ALLOWED_HOSTS ?? "")
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean);

  return {
    plugins: [react()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: {
      port: 5174,
      allowedHosts,
      proxy: {
        "/api": { target: "http://localhost:5001", changeOrigin: true },
      },
    },
  };
});
