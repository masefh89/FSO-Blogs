const globals = require ("globals")
const js = require ("@eslint/js")
const stylisticJs = require ("@stylistic/eslint-plugin")

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest"
    },
    plugins: {
      "@stylistic/js": stylisticJs
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/semi": ["error", "never"],
      eqeqeq: ["error", "always"],
      "no-console": "off",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before:true, after:true }]
    }
  }
]