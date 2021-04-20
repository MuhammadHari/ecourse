import localTunnel from "localtunnel";
import child from "child_process";

child.exec("php artisan serve --host=0.0.0.");
(async () => {
 const tunnel = await localTunnel({ port: "8000", subdomain: "e-course" });
  console.log(tunnel.url);
})();
