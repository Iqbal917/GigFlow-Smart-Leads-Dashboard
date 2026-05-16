import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED ROUTE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY ROUTE (RBAC DEMO) */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <h1>Admin Panel</h1>
            </RoleRoute>
          }
        />

        {/* FALLBACK ROUTE */}
        <Route
          path="*"
          element={<LoginPage />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;