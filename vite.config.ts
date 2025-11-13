import { defineConfig } from "vite";
import reactCompiler from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactCompiler(), tailwindcss()],
});
