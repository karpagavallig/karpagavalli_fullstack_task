import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./App.css";

import App from "./App.jsx";
import { PlacementProvider } from "./context/PlacementContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PlacementProvider>
            <App />
        </PlacementProvider>
    </StrictMode>
);