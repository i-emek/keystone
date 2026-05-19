import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "build/**",
      "dist/**",
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
    ],
  },
];

export default config;
