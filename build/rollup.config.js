var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
// var watch = require('rollup-watch');

// rollup.rollup({
module.exports = {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'lib-model',
    sourceMap: true,
    dest: 'dist/bundle.js',
    // watch: {
    //     chokidar: {
    //     },
    //     exclude: ['node_modules/**']
    // },
    plugins: [
        uglify(),
        babel({
            exclude: 'node_modules/**'
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