import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
