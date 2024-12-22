import { build } from "esbuild";
import { glob } from "glob";

const entryPoints = glob.sync("./src/**/*.ts", {
  ignore: ["./src/**/*.test.ts"],
});

await build({
  entryPoints,
  logLevel: "info",
  platform: "node",
  bundle: true,
  outbase: "./src",
  outdir: "./dist",
  format: "esm",
});
