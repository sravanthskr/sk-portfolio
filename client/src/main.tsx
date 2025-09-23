import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message?.includes("aborted")) {
    event.preventDefault();
    console.warn("Suppressed aborted request error");
  }
});
