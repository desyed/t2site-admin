import pluginJs from "@eslint/js";
import pluginQuery from '@tanstack/eslint-plugin-query';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs["flat/recommended"],
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: ".",
      }],
    },
  },
  {
    languageOptions: {
      globals: globals.builtin,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/better-regex': 'error',
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-children-prop": "off",
      "react/prop-types": "off",
      "semi": "error",
      "no-console": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      react: {
        version: "detect"
      }
    },
  },
];
