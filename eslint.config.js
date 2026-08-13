import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: [
      ".agents/**",
      "coverage/**",
      "dist/**",
      "dist-subpath/**",
      "node_modules/**",
      "playwright-report/**",
      "public/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      "no-console": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-uses-vars": "error",
      "react/no-danger": "error",
      "react/no-unknown-property": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: "Render trusted values as React text nodes instead of injecting HTML.",
        },
        {
          selector: "AssignmentExpression[left.property.name='innerHTML']",
          message: "Do not assign dynamic HTML. Prefer safe DOM or React text rendering.",
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.test.{js,jsx}"],
    languageOptions: {
      globals: globals.vitest,
    },
  },
];
