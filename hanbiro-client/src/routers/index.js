import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "routers/routes";

import Navigation from "pages/Admin/Navigation";
import AdminPage from "pages/Admin/Dashboard";
const MemberDetail = lazy(() => import("pages/Admin/MemberDetail"));

const Routers = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path={routes.admin.root} element={<Navigation />}>
          <Route path={routes.admin.dashboard} element={<AdminPage />} />
          <Route path={routes.admin.member} element={<MemberDetail />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={routes.admin.dashboard} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default Routers;
