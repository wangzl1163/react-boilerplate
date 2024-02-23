/*
 * @Description:
 * @Author:
 * @Date: 2023-10-20 14:00:02
 * @LastEditTime: 2023-12-11 10:25:40
 * @LastEditors:
 */
module.exports = {
   root: true,
   env: { browser: true, es2023: true, node: true },
   extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended", "prettier"],
   ignorePatterns: ["dist"],
   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
   settings: { react: { version: "18.2" } },
   plugins: ["react-refresh"],
   rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/prop-types": [0],
      "react-hooks/exhaustive-deps": [0]
   }
};
