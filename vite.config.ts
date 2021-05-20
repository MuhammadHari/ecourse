import reactRefresh from "@vitejs/plugin-react-refresh";
import aliases from "./vite.alias.config";

export default ({ command }: any) => ({
  base: command === "serve" ? "" : "/build/",
  publicDir: "fake_dir_so_nothing_gets_copied",
  build: {
    manifest: true,
    outDir: "public/build",
    rollupOptions: {
      input: "views/loader.tsx",
    },
  },
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ["voca", "lodash", "mobx", "mobx-state-tree"],
  },
  resolve: {
    alias: aliases,
  },
});
