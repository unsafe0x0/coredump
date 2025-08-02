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
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "no-extra-semi": "off",
      "no-extra-boolean-cast": "off",
      "no-extra-parens": "off",
      "no-extra-bind": "off",
      "no-extra-label": "off",
      "no-unexpected-multiline": "off",
      "no-unreachable": "off",
    },
  },
];

export default eslintConfig;
