import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Next.js core-web-vitals rules (enables Next plugin detection)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // TypeScript recommended rules
  tseslint.configs.recommended,
  // Project overrides to align with Next.js App Router and TS setup
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { react: pluginReact },
    settings: { react: { version: "detect" } },
    rules: {
      // Base React recommended rules (scoped only to source files)
      ...pluginReact.configs.flat.recommended.rules,
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
  {
    ignores: [
      "app/admin/**/*",
      "test-*.js",
      "*.old.*",
      "src/app/**/*",
      ".continue/**/*",
      "sanity/**/*",
      ".next/**/*",
      "next-env.d.ts",
      "**/*.md",
      "package-lock.json",
    ],
  },
  // JSON/Markdown linting
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
]);
