import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function copyRootAssetsToDist() {
  return {
    name: "copy-root-assets-to-dist",
    closeBundle() {
      const sourceDir = resolve(__dirname, "Assets");
      const targetDir = resolve(__dirname, "dist/Assets");

      if (!existsSync(sourceDir)) {
        return;
      }

      cpSync(sourceDir, targetDir, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [copyRootAssetsToDist()],
});
