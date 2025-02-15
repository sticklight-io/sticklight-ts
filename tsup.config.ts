import { defineConfig } from "tsup";

export default defineConfig((cliOptions) => ({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Creates both CommonJS and ES Modules
  dts: true, // Generates .d.ts files and performs typechecking via TypeScript.
  splitting: false,
  sourcemap: true,
  clean: true, // Clean output directory before build
  minify: !cliOptions.watch,

  ...cliOptions,
}));
