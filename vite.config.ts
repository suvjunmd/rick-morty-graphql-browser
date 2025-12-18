/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/rick-morty-graphql-browser/",
    test: {
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
    },
});
