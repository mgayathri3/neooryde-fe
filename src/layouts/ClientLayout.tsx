// `Client` refers to organizations
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import ClienteleIcon from '../assets/group.svg';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { useAdminStore } from '../stores/adminStore';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../types/auth';

const ClientLayout = () => {
  const { isNavCollapsed, setNavCollapsed } = useAdminStore();
  const { user } = useAuthStore();
  const setTheme = useAppStore(state => state.setTheme);
  const theme = useAppStore(state => state.currentTheme);

  useEffect(() => {
    setTheme('admin');
  }, [setTheme]);

  const navItems = [
    {
      to: '/client',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      to: '/client/vendors',
      icon: <img src={ClienteleIcon} className="w-5 h-5" />,
      label: 'Vendors',
      hidden: !(user?.role === Roles.CLIENT_ADMIN),
    },
    {
      to: '/client/users',
      icon: <img src={ClienteleIcon} className="w-5 h-5" />,
      label: 'Manage Users',
      hidden: !(user?.role === Roles.CLIENT_ADMIN),
    },
    {
      to: '/client/assign',
      icon: <Users className="w-5 h-5" />,
      label: 'Assign Rides',
    },
    {
      to: '/client/request',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
    },
  ];

  return (
    <DashboardLayout
      title=""
      navItems={navItems}
      bgColor={theme.primary.background}
      hoverColor={theme.primary?.hover}
      isNavCollapsed={isNavCollapsed}
      setNavCollapsed={setNavCollapsed}
    />
  );
};

export default ClientLayout;
