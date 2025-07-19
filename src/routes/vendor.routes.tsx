import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../components/Auth/AuthGuard';
import VendorLayout from '../layouts/VendorLayout';
import Clientele from '../pages/vendor/Clientele';
import VendorDashboard from '../pages/vendor/Dashboard';
import UserManagement from '../pages/vendor/UserManagement';
import VendorRegisterUser from '../pages/vendor/UserManagement/RegisterUser';
import { VendorUsers } from '../pages/vendor/UserManagement/Users';
import DriverData from '../pages/vendor/DriverData';
import DriverDetails from '../pages/vendor/DriverDetails'; // Import the new component
import IncompleteDrivers from '../pages/vendor/IncompleteDrivers/IncompleteDrivers'; // Import IncompleteDrivers component
import { Roles } from '../types/auth';

export const vendorRoutes: RouteObject = {
  path: 'vendor',
  element: (
    <AuthGuard
      allowedRoles={[
        Roles.SUPER_ADMIN,
        Roles.ADMIN,
        Roles.VENDOR_ADMIN,
        Roles.VENDOR_USER,
      ]}
    >
      <VendorLayout />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <VendorDashboard />,
    },
    { path: 'clients', element: <Clientele /> },
    {
      path: 'users',
      element: <UserManagement />,
      children: [
        { index: true, element: <VendorUsers /> },
        { path: 'registration', element: <VendorRegisterUser /> },
      ],
    },
    {
      path: 'drivers',
      children: [
        { index: true, element: <DriverData /> },
        { path: ':driverId', element: <DriverDetails /> }, // New route for driver details
        { path: 'incomplete', element: <IncompleteDrivers /> }, // New route for incomplete drivers
      ],
    },
  ],
};
