// `Client` refers to organizations
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import CarIcon from '../assets/car.svg';
import DriverIcon from '../assets/driver.svg';
import ClienteleIcon from '../assets/group.svg';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import FeatureFlags from '../constants/FeatureFlag';
import useHasFeatureFlag from '../hooks/useHasFeatureFlag';
import { useAdminStore } from '../stores/adminStore';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../types/auth';

const VendorLayout = () => {
  const { isNavCollapsed, setNavCollapsed } = useAdminStore();
  const { user } = useAuthStore();
  const setTheme = useAppStore(state => state.setTheme);
  const theme = useAppStore(state => state.currentTheme);

  useEffect(() => {
    setTheme('admin');
  }, [setTheme]);

  const navItems = [
    {
      to: '/vendor',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      to: '/vendor/clients',
      icon: <img src={ClienteleIcon} className="w-5 h-5" />,
      label: 'Clients',
      hidden: !(user?.role === Roles.VENDOR_ADMIN),
    },
    {
      to: '/vendor/users',
      icon: <img src={ClienteleIcon} className="w-5 h-5" />,
      label: 'Manage Users',
      hidden: !(user?.role === Roles.VENDOR_ADMIN),
    },
    {
      to: '/vendor/drivers',
      icon: <img src={DriverIcon} className="w-5 h-5" />,
      label: 'Drivers',
      hidden: !(user?.role === Roles.VENDOR_ADMIN),
    },
    {
      to: '/vendor/fleet',
      icon: <img src={CarIcon} className="w-5 h-5" />,
      label: 'Fleet',
      hidden: !(user?.role === Roles.VENDOR_ADMIN),
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

export default VendorLayout;
