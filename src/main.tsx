import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import PrivateBetaGate from "./components/PrivateBetaGate";
import "./index.css";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivateBetaGate>
      <Suspense fallback={<div className="h-full w-full bg-black" aria-hidden="true" />}>
        <App />
      </Suspense>
    </PrivateBetaGate>
  </StrictMode>,
);
