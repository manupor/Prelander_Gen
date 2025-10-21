import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Game files and third-party scripts
      "public/CastleSlot/**",
      "src/CastleSlot-1/**",
      "**/c3runtime.js",
      "**/main.js",
      "**/scripts/**",
      "**/opus.wasm.js",
      "**/bootstrap.min.js",
      "**/*.min.js",
      "**/*.bundle.js",
      // Debug files
      "src/app/api/debug-env/**",
    ],
  },
  {
    rules: {
      // Disable strict rules for production build
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@next/next/no-img-element": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-css-tags": "warn",
      // Allow some common patterns
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
