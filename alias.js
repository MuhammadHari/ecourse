const paths = require("./tsconfig.extends.json").compilerOptions.paths;
const path = require("path");
const voca = require("voca");

const parsed = {};
const removeSlashStars = (val) => voca(val).replaceAll("/*", "").value();

Object.keys(paths).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("" + removeSlashStars(paths[str][0]));
});

module.exports = parsed;
