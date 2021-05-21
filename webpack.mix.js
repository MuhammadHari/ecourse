const mix = require("laravel-mix");
const tsConfig = require("tsconfig-paths-webpack-plugin");
const paths = require("./tsconfig.extends.json").compilerOptions.paths;
const voca = require("voca");
const path = require("path");

const parsed = {};
const removeSlashStars = (val) => voca(val).replaceAll("/*", "").value();

Object.keys(paths).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("" + removeSlashStars(paths[str][0]));
});

mix
  .alias(parsed)
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  })
  .ts("./views/loader.tsx", "public/js/app.js")
  .react();
