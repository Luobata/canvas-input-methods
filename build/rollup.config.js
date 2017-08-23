const rollup = require('rollup');
const flow = require('rollup-plugin-flow-no-whitespace')
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const alias = require('rollup-plugin-alias');
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';

const root = path.resolve(__dirname, './');

module.exports = {
    input: 'src/index.js',
    name: 'canvasInputMethod',
    sourcemap: true,
    output: {
        file: 'dist/bundle.js',
        format: 'umd'
    },
    plugins: [
        // uglify(),
        resolve(),
        flow(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [ 
                [ 'es2015', { "modules": false } ]
            ],
        }),
        alias({
            UI: path.resolve(__dirname, '../src/ui'),
            EVENT: path.resolve(__dirname, '../src/event')
        })
    ]
// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
};
