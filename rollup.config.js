import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const plugins = [
    typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
    }),
    terser(),
    nodeResolve(),
]

export default {
    plugins: plugins,
    input: "src/index.ts",
    output: [
        { file: "dist/index.esm.js", format: "esm", name: "Graph", sourcemap: true },
        { file: "dist/index.umd.js", format: "umd", name: "Graph", sourcemap: true }
    ],
}