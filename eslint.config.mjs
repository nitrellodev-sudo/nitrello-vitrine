import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Avertit si des variables sont declarees mais jamais utilisees
      "@typescript-eslint/no-unused-vars": "warn",
      // Empeche d'utiliser <img> au lieu de <Image /> de Next.js
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
