import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
   js.configs.recommended,
   eslintConfigPrettier,
   reactRefresh.configs.vite,
   reactHooks.configs['recommended-latest'],
   {
      plugins: [react],

      languageOptions: {
         globals: {
            ...globals.browser,
            defineProps: "writable",
            defineEmits: "writable"
         },

         parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },

         ecmaVersion: "latest",
         sourceType: "module"
      },

      rules: {
         "no-tabs": [
            "error",
            {
               allowIndentationTabs: true
            }
         ],
         "no-unused-vars": ["off"],
         "no-undef": "off"
      }
   }
]);
