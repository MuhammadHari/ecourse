/* eslint-disable */
const mix = require('laravel-mix');
const TsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;

mix
  .webpackConfig({
    resolve : {
      plugins : [new TsPlugin()]
    }
  })
  .typeScript("./views/entry.ts", "public/js/app.js")
  .react()
  .disableSuccessNotifications()
  .sass('resources/sass/app.scss', 'public/css');
