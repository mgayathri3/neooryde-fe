import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../components/Auth/AuthGuard';
import ClientLayout from '../layouts/ClientLayout';
import Clientele from '../pages/client/Clientele';
import ClientDashboard from '../pages/client/Dashboard';
import UserManagement from '../pages/client/UserManagement';
import ClientRegisterUser from '../pages/client/UserManagement/RegisterUser';
import { ClientUsers } from '../pages/client/UserManagement/Users';
import { Roles } from '../types/auth';

export const clientRoutes: RouteObject = {
  path: 'client',
  element: (
    <AuthGuard
      allowedRoles={[
        Roles.SUPER_ADMIN,
        Roles.ADMIN,
        Roles.CLIENT_ADMIN,
        Roles.CLIENT_USER,
      ]}
    >
      <ClientLayout />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <ClientDashboard />,
    },
    { path: 'vendors', element: <Clientele /> },
    {
      path: 'users',
      element: <UserManagement />,
      children: [
        { index: true, element: <ClientUsers /> },
        { path: 'registration', element: <ClientRegisterUser /> },
      ],
    },
  ],
};
