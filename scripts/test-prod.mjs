import { spawn } from "node:child_process";
import http from "node:http";

function shCmd(cmdline, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmdline, { shell: true, stdio: "inherit", ...opts });
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`command exited ${code}: ${cmdline}`))));
    p.on("error", reject);
  });
}

function waitForHealth(url = "http://localhost:3000/api/health", { timeoutMs = 20000, intervalMs = 500 } = {}) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) return resolve(true);
        if (Date.now() - start > timeoutMs) return reject(new Error(`Health check timeout at ${url}`));
        setTimeout(tick, intervalMs);
      });
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) return reject(new Error(`Health check timeout at ${url}`));
        setTimeout(tick, intervalMs);
      });
    };
    tick();
  });
}

(async () => {
  // Käivita prod-server
  const server = spawn("node", ["./node_modules/next/dist/bin/next", "start", "-p", "3000"], { stdio: "inherit" });

  try {
    // Oota kuni /api/health vastab 2xx
    await waitForHealth();

    // Käivita Playwright e2e prod buildi vastu (shell mode: töötab nii Windowsis kui macOS/Linuxis)
    await shCmd("npm run test:e2e");
  } finally {
    if (!server.killed) server.kill("SIGTERM");
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
