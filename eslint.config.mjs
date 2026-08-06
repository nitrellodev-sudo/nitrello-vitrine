import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
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
