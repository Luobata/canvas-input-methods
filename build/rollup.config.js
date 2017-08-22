const rollup = require('rollup');
const flow = require('rollup-plugin-flow-no-whitespace')
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const alias = require('rollup-plugin-alias');
import path, { posix } from 'path';

const root = path.resolve(__dirname, './');
// var watch = require('rollup-watch');

// rollup.rollup({
module.exports = {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'canvas-input-method',
    sourceMap: true,
    dest: 'dist/bundle.js',
    // watch: {
    //     chokidar: {
    //     },
    //     exclude: ['node_modules/**']
    // },
    plugins: [
        // uglify(),
        flow(),
        babel({
            exclude: 'node_modules/**'
        }),
        alias({
            // resolve: ['.js'],
            UI: path.resolve(__dirname, '../src/ui')
        })
    ]
// }).then(function(bundle) {
//     bundle.write({
//         // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
//         format: 'umd',
//         moduleName: 'lib-model',
//         sourceMap: true,
//         dest: 'dist/bundle.js'
//     });
};