import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

// Prevent context menu (right-click) globally for native feel
document.addEventListener("contextmenu", (event) => event.preventDefault());

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

function showBootError(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? (err.stack ?? "") : "";
  rootElement!.innerHTML = `
    <div style="padding:24px;font-family:system-ui,sans-serif;background:#09090b;color:#f4f4f5;min-height:100vh;box-sizing:border-box;">
      <h1 style="color:#f87171;margin:0 0 12px;font-size:20px;">App failed to start</h1>
      <pre style="white-space:pre-wrap;background:#18181b;padding:16px;border-radius:8px;border:1px solid #27272a;font-size:13px;overflow:auto;">${message}

${stack}</pre>
      <p style="color:#a1a1aa;margin-top:16px;">Open DevTools (F12) → Console for full details. Then share the red error.</p>
    </div>
  `;
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (err) {
  console.error(err);
  showBootError(err);
}

window.addEventListener("error", (e) => {
  console.error("Window error:", e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled rejection:", e.reason);
});
