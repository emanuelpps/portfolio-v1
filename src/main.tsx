import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "lenis/dist/lenis.css";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ScrollProvider } from "@/context/ScrollContext";
import { SmoothScroll } from "@/lib/SmoothScroll";
import App from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </ScrollProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
