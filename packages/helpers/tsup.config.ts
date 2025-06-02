import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/string/index.ts",
    "src/number/index.ts",
    "src/validation/index.ts",
    "src/datetime/index.ts",
    "src/constants/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
