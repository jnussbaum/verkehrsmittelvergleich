import { ESLint } from 'eslint';

export default [
  {
    // Extend recommended rules and React app configuration
    extends: [
      'eslint:recommended',
      'react-app',
    ],
    settings: {
      react: {
        // Automatically detect the React version
        version: 'detect',
      },
      // Configure import resolver for custom paths and extensions
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Add custom rules here if needed
    },
  },
  {
    // Note: there should be no other properties in this object
    ignores: [
        "node_modules/",
        "dist/",
        "eslint.config.js",
        "env.d.ts",
    ]
}
];
