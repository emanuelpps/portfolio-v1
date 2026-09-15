import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

// Code-split the project sheet — it is only needed once a project is opened.
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));

/**
 * Two real routes, where there used to be one page and an overlay.
 *
 * The sheet was a fixed, full-screen layer painted over a home page that kept
 * rendering underneath it, scrolling in its own container with Lenis stopped
 * and the body locked. That is why it needed a "Top ↑" button of its own, why
 * it could not name itself in the tab strip, and — the real cost — why the
 * project came out of `location.state` rather than out of the URL: opening
 * `/project/11` in a new tab, reloading it, or sending it to anyone landed on
 * "Project not found".
 *
 * An unknown path falls through to the home page. This is a one-page site with
 * exactly one other kind of address; a 404 screen here would be a room nobody
 * has a reason to be standing in.
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/project/:projectId"
      element={
        <Suspense fallback={null}>
          <ProjectDetails />
        </Suspense>
      }
    />
    <Route path="*" element={<Home />} />
  </Routes>
);

export default AppRoutes;
