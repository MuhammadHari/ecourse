const run = require("concurrently");
const o = require("open");
let scripts = [
  "php artisan view:cache",
  "php artisan config:cache",
  "php artisan route:cache",
];
let c = () => {
  return process.argv.includes("--run-php-dev")
    ? run(["php artisan dev"])
        .catch(console.log)
        .then(() => {
          o("http://localhost:8000");
          return run(scripts);
        })
    : run(scripts);
};
c().catch(console.log);
