
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { STATIC_ASSETS } from "./services/api";

  // Set favicon dynamically based on API URL
  const favicon = document.getElementById("favicon") as HTMLLinkElement;
  if (favicon) {
    favicon.href = STATIC_ASSETS.favicon;
  }

  createRoot(document.getElementById("root")!).render(<App />);
  