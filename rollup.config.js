// Rollup plugins
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-porter';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    file: 'public/static/js/bundle.js'
  },
  name: 'app',
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // extract component CSS to a separate file
      css: css => {
        css.write('public/static/css/bundle.css');
      },
      // enable https://svelte.technology/guide#state-management
      store: true,
      // this results in smaller CSS files
      cascade: false
    }),

    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    // production?
    production && buble({ exclude: 'node_modules/**' }),
    production && uglify(),
    css({
      minified: true,
      dest: 'public/static/css/styles.css',
    }),

    production ? false : livereload('public'),
  ]
};