import { Navigate, Route, Routes } from "react-router-dom";

import {
  DASHBOARD,
  BILLINGS,
  STOCK,
  CUSTOMERS,
  SETTINGS,
  BATTERIES,
  USERS,
  SCRAP,
} from "./path";
import React, { Suspense, lazy } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useAuthContext from "../../auth-store/useAuthContext";

const Dashboard = lazy(() => import("../../Pages/Dashboard"));
const LoginPage = lazy(() => import("../../Pages/login-page"));
const LandingPage = lazy(() => import("../../Pages/LandingPage"));
const Batterypage = lazy(() => import("../../Pages/BatteryPage"));
const BillStatusPage = lazy(() => import("../../Pages/PaymentPage"));
const StockItemPage = lazy(() => import("../../Pages/StockItemPage"));
const StockPage = lazy(() => import("../../Pages/StockPage"));
const CustomerPage = lazy(() => import("../../Pages/CustomerPage"));
const CustomerBatteryPage = lazy(() => import("../../Pages/CustomerBatteryPage"));
const PageNotFound = lazy(() => import("../../Pages/NotFoundPage"));
const UserPage = lazy(() => import("../../Pages/UsersPage"));
const SettingsPage = lazy(() => import("../../Pages/Settings"));
const ScrapPage = lazy(() => import("../../Pages/ScrapPage"));

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const {
    state: { isAuthenticated, isSessionRestored },
  } = useAuthContext();

  if (!isSessionRestored) return null;
  return isAuthenticated ? element : <Navigate to="/admin-login" replace />;
};

const KallyankarRoute: React.FC = () => {
  return (
    <div className="font-sans w-full">
      <Suspense fallback={<LoadingSpinner open={true} />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin-login" element={<LoginPage />} />

          <Route path={DASHBOARD} element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path={`${CUSTOMERS}/:customerId`} element={<ProtectedRoute element={<CustomerBatteryPage />} />} />
          <Route path={CUSTOMERS} element={<ProtectedRoute element={<CustomerPage />} />} />
          <Route path={BATTERIES} element={<ProtectedRoute element={<Batterypage />} />} />
          <Route path={BILLINGS} element={<ProtectedRoute element={<BillStatusPage />} />} />
          <Route path={USERS} element={<ProtectedRoute element={<UserPage />} />} />
          <Route path={SETTINGS} element={<ProtectedRoute element={<SettingsPage />} />} />
          <Route path={STOCK} element={<ProtectedRoute element={<StockPage />} />} />
          <Route path={`${STOCK}/:stock_id`} element={<ProtectedRoute element={<StockItemPage />} />} />
          <Route path={SCRAP} element={<ProtectedRoute element={<ScrapPage />} />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default KallyankarRoute;
