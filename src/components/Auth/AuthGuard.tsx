import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Roles[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, token } = useAuthStore();
  const location = useLocation();

  const dashboardRoutes = [
    { role: Roles.SUPER_ADMIN, route: '/admin' },
    { role: Roles.ADMIN, route: '/admin' },
    { role: Roles.VENDOR_ADMIN, route: '/vendor' },
    { role: Roles.VENDOR_USER, route: '/vendor' },
    { role: Roles.CLIENT_ADMIN, route: '/client' },
    { role: Roles.CLIENT_USER, route: '/client' },
  ];

  if (!token || !user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user doesn't have required role
    const route = dashboardRoutes.find(value => value.role === user.role);

    const defaultRoute = route ? route.route : '/not-found';

    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
};
