import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      rollupOptions: {
        input: {
          main: "index.html",
        },
        output: {
          entryFileNames: "[name].js",
          format: "esm",
        },
      },
    },
    resolve: {
      alias: {},
    },
    plugins: [react()],
    define: {
      "import.meta.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(
        env.VITE_GOOGLE_MAPS_API_KEY
      ),
    },
  };
});
