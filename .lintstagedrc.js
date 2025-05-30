module.exports = {
  // JavaScript/TypeScript files
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  // JSON files
  "**/*.{json,jsonc}": ["prettier --write"],

  // Markdown files
  "**/*.{md,mdx}": ["prettier --write"],

  // CSS/SCSS files
  "**/*.{css,scss,sass}": ["prettier --write"],

  // YAML files
  "**/*.{yml,yaml}": ["prettier --write"],

  // Package.json files (to ensure consistent formatting)
  "**/package.json": ["prettier --write"],
};
