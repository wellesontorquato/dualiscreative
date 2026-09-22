import {
  defineConfig,
  globalIgnores,
} from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";


const eslintConfig = defineConfig([
  ...nextVitals,

  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    /*
     * Assets compilados do MediaPipe.
     *
     * São distribuídos prontos pelo pacote
     * @mediapipe/tasks-vision e não fazem
     * parte do código-fonte da Dualis.
     */
    "public/mediapipe/wasm/**",
    ".audit-backups/**",
    "backup-*/**",
  ]),
]);


export default eslintConfig;
