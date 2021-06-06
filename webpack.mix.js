const mix = require("laravel-mix");
const tsConfig = require("tsconfig-paths-webpack-plugin");
const paths = require("../ecourse.view/tsconfig.extends.json").compilerOptions.paths;
const voca = require("voca");
const path = require("path");
const fs = require("fs");

const parsed = {};
const removeSlashStars = (val) => voca(val).replaceAll("/*", "").value();

Object.keys(paths).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("../ecourse.view/" + removeSlashStars(paths[str][0]));
});

const host = process.env["APP_URL"].split("//")[1];
const homedir = process.env["HOME"];

const webpackConfig = {
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
};

const isWin = process.platform === "win32";
if (process.argv.includes("--hot") && !isWin) {
  webpackConfig.devServer = {
    https: {
      key: fs
        .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.key`))
        .toString(),
      cert: fs
        .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.crt`))
        .toString(),
    },
  };
}

console.log(
  parsed
)

mix
  .options({
    hmrOptions: {
      host: process.env["APP_URL"].split("//")[1],
      port: 3000,
    },
  })
  .alias(parsed)
  .webpackConfig(webpackConfig)
  .override((c) => {
    c.output.publicPath = process.env.APP_URL + `:${3000}/`;
  })
  .ts("../ecourse.view/src/loader.tsx", "public/js/app.js")
  .disableSuccessNotifications()
  .react();
