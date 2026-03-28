import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getDiaries, saveDiary } from "./lib/storage";
import { SEED_DIARIES } from "./data/seed";
import "./index.css";

// Seed data synchronously before React renders — ensures data exists on first paint
if (getDiaries().length === 0) {
  SEED_DIARIES.forEach(saveDiary);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
