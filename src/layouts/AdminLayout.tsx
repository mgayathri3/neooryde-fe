import { LayoutDashboard, MonitorCog, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import ClienteleIcon from '../assets/group.svg';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import FeatureFlags from '../constants/FeatureFlag';
import useHasFeatureFlag from '../hooks/useHasFeatureFlag';
import useLoadFeatureFlag from '../hooks/useLoadFeatureFlag';
import { useAdminStore } from '../stores/adminStore';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../types/auth';

const AdminLayout = () => {
  const { isNavCollapsed, setNavCollapsed } = useAdminStore();
  const { user } = useAuthStore();
  const setTheme = useAppStore(state => state.setTheme);
  const theme = useAppStore(state => state.currentTheme);
  useLoadFeatureFlag();

  useEffect(() => {
    setTheme('admin');
  }, [setTheme]);

  const navItems = [
    {
      to: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      to: '/admin/clientele',
      icon: <img src={ClienteleIcon} className="w-5 h-5" />,
      label: 'Clientele',
    },
    {
      to: '/admin/users',
      icon: <Users className="w-5 h-5" />,
      label: 'Manage Users',
      // hidden: !useHasFeatureFlag(FeatureFlags.USER_REGISTERATION),
    },
    {
      to: '/admin/feature-flags',
      icon: <MonitorCog className="w-5 h-5" />,
      label: 'Feature Flags',
      hidden: !useHasFeatureFlag(FeatureFlags.FEATURE_FLAGS),
    },
    {
      to: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      hidden: !useHasFeatureFlag(FeatureFlags.SETTINGS),
    },
  ];

  return (
    <DashboardLayout
      title="Admin Panel"
      navItems={navItems}
      bgColor={theme.primary.background}
      hoverColor={theme.primary?.hover}
      isNavCollapsed={isNavCollapsed}
      setNavCollapsed={setNavCollapsed}
    />
  );
};

export default AdminLayout;
