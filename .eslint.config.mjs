// ESLint 9 flat-config
import js from "@eslint/js";
import next from "eslint-config-next";

// âœ… Paneme configu muutujasse, siis teeme default export'i.
// See vaigistab "import/no-anonymous-default-export" hoiatuse.
const config = [
  js.configs.recommended,
  ...next(),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;


