import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint"

const currentDir = process.cwd();

export default {
  input: Object.fromEntries(
		glob.sync('src/**/*.ts')
    .map(file =>  [
			path.relative(
				'src',
				file.slice(0, file.length - path.extname(file).length)
			),
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
  output: {
    dir: 'dist',
    format: 'cjs', 
    preserveModules: true
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json', 
    }),
    commonjs(),
    babel()
  ],
};