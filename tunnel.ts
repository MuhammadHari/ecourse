import localTunnel from "localtunnel";
import * as process from "child_process";
import opener from "opener";

process.exec("php artisan serve --host=0.0.0.");

(async () => {
  const tunnel = await localTunnel({ port: "8000", subdomain: "e-course" });
  opener(tunnel.url);
  console.log(tunnel.url)
})();
