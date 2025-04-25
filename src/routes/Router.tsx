import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProjectDetails from "../pages/ProjectDetails";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectDetails />} />
    </Routes>
  );
};

export default AppRoutes;
