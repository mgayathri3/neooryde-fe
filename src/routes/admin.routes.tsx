import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../components/Auth/AuthGuard';
import AdminLayout from '../layouts/AdminLayout';
import AdminClientele from '../pages/admin/Clientele';
import AdminDashboard from '../pages/admin/Dashboard';
import FeatureFlags from '../pages/admin/FeatureFlags';
import Settings from '../pages/admin/Settings';
import UserManagement from '../pages/admin/UserManagement';
import AdminRegisterUser from '../pages/admin/UserManagement/RegisterUser';
import Users from '../pages/admin/UserManagement/Users';
import { Roles } from '../types/auth';

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: (
    <AuthGuard allowedRoles={[Roles.SUPER_ADMIN, Roles.ADMIN]}>
      <AdminLayout />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: 'users',
      element: <UserManagement />,
      children: [
        { index: true, element: <Users /> },
        { path: 'registration', element: <AdminRegisterUser /> },
      ],
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    {
      path: 'feature-flags',
      element: (
        <AuthGuard allowedRoles={[Roles.SUPER_ADMIN]}>
          <FeatureFlags />
        </AuthGuard>
      ),
    },
    { path: 'clientele', element: <AdminClientele /> },
  ],
};
