// @ts-check
import esbuild from "esbuild";
import { copyFile, readFile, writeFile, rm } from "node:fs/promises";

/**
 * @type {esbuild.BuildOptions}
 */
const sharedOptions = {
  sourcemap: "external",
  sourcesContent: true,
  minify: false,
  allowOverwrite: true,
  packages: "external",
};

async function main() {
  // Start with a clean slate
  await rm("pkg", { recursive: true, force: true });
  // Build the source code for a neutral platform as ESM
  await esbuild.build({
    entryPoints: ["./src/*.ts", "./src/**/*.ts"],
    outdir: "pkg/dist-src",
    bundle: false,
    platform: "neutral",
    format: "esm",
    ...sharedOptions,
    sourcemap: false,
  });

  const entryPoints = ["./pkg/dist-src/index.js"];

  await esbuild.build({
    entryPoints,
    outdir: "pkg/dist-bundle",
    bundle: true,
    platform: "neutral",
    format: "esm",
    ...sharedOptions,
  });

  // Copy the README, LICENSE to the pkg folder
  await copyFile("LICENSE", "pkg/LICENSE");
  await copyFile("README.md", "pkg/README.md");

  // Handle the package.json
  let pkg = JSON.parse((await readFile("package.json", "utf8")).toString());
  // Remove unnecessary fields from the package.json
  delete pkg.scripts;
  delete pkg.prettier;
  delete pkg.release;
  delete pkg.jest;
  await writeFile(
    "pkg/package.json",
    JSON.stringify(
      {
        ...pkg,
        files: ["dist-*/**", "bin/**"],
        types: "dist-types/index.d.ts",
        exports: {
          ".": {
            types: "./dist-types/index.d.ts",
            import: "./dist-bundle/index.js",
            default: "./dist-src/index.js"
          },
        },
        sideEffects: false,
      },
      null,
      2
    )
  );
}
main();