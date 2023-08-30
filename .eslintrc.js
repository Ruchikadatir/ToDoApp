module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "google",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 4],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "linebreak-style": ["error", "unix"],
    "max-len": [
      "error",
      {
        code: 340,
      },
    ],
    "no-console": 0,
    "new-cap": 0,
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-invalid-this": 0,
  },
};
