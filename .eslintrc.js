module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:unicorn/recommended",
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "react/destructuring-assignment": "off",
    "react/jsx-filename-extension": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-array-for-each": "off",
    "import/no-extraneous-dependencies": "off",
    "unicorn/no-abusive-eslint-disable":"off",
    "@typescript-eslint/no-unsafe-call":"off",
    "@typescript-eslint/no-unsafe-return":"off",
    "@typescript-eslint/no-explicit-any":"off",
    "@typescript-eslint/unbound-method":"off",
    "unicorn/no-null":"off",
    "@typescript-eslint/no-unsafe-member-access":"off",
    "@typescript-eslint/no-unsafe-assignment":"off"
  },
};
