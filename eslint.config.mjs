import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // TypeScript recommended rules
  tseslint.configs.recommended,
  // React recommended rules
  pluginReact.configs.flat.recommended,
  // Project overrides to align with Next.js App Router and TS setup
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unknown-property": "off",
    },
    ignores: ["app/admin/**/*", "test-*.js", "*.old.*"],
  },
  // Global fallback rules (ensure disabling of legacy rules)
  { rules: { "react/react-in-jsx-scope": "off" }, ignores: [] },
  // Top-level ignores
  { ignores: ["app/admin/**/*", "test-*.js", "*.old.*", "src/app/**/*"] },
  // JSON/Markdown linting
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
]);
