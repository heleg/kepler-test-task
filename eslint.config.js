import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { configs as tseslintConfigs, config } from "typescript-eslint";

export default config(
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  tseslintConfigs.base,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: [
            "packages/*/tsconfig.json",
            "packages/*/tsconfig.app.json",
            "packages/*/tsconfig.node.json",
          ],
        },
      },
    },
    rules: {
      "react/button-has-type": 2,
      "react/self-closing-comp": 2,

      curly: 2,
      "no-unused-vars": 0,
      eqeqeq: 0,
      "import/order": [
        2,
        {
          groups: [
            "unknown",
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "node:*",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@kepler-test-task/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["packages/api/**/*.{ts}"],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-require-imports": 2,
    },
  },
  {
    files: ["packages/web/**/*.{ts,tsx}"],
    settings: {
      globals: { window: true },
    },
  },
);
