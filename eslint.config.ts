import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";


export default tseslint.config([
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
