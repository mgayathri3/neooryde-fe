import { LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import logo from '../../assets/new_logo.svg';
import useGetFeatures from '../../services/queries/useGetFeatures';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import { DashboardLayoutProps } from './dashboard.interface';

const DashboardLayout = ({
  navItems,
  bgColor,
  hoverColor,
  isNavCollapsed,
  setNavCollapsed,
}: DashboardLayoutProps) => {
  const { logout, user } = useAuthStore();
  const { resetFeatures, setFeatureFlags } = useAppStore();

  // Handle responsive navigation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNavCollapsed(true);
      } else {
        setNavCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: featureFlag, isLoading, isSuccess } = useGetFeatures();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setFeatureFlags(featureFlag.data.features);
    }
  }, [isSuccess, isLoading]);

  const onChangeHandler = () => {
    console.log('=========checked');
  };

  // Handle responsive navigation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNavCollapsed(true);
      } else {
        setNavCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    resetFeatures();
    logout();
  };

  return (
    <div className="flex h-screen">
      <nav
        className={`${isNavCollapsed ? 'w-16' : 'w-64'} ${bgColor} text-white p-4 transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div
          className={`flex ${isNavCollapsed ? 'justify-center' : 'justify-between'} items-center mb-8`}
        >
          {!isNavCollapsed && (
            <img src={logo} alt="logo" className="h-[38px]" />
          )}
          {isNavCollapsed && (
            <img src={icon} alt="neuryde" className="h-[38px]" />
          )}

          {/* <button
            onClick={() => setNavCollapsed(!isNavCollapsed)}
            className={`p-1 rounded-lg ${hoverColor} transition-colors`}
            aria-label={isNavCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button> */}
        </div>

        <ul className="space-y-2 flex-1">
          {navItems.map(
            item =>
              (!item.hidden || user?.role === Roles.SUPER_ADMIN) && (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center ${isNavCollapsed ? 'justify-center' : ''} space-x-2 p-2 rounded ${hoverColor} transition-colors`}
                  >
                    {item.icon}
                    {!isNavCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ),
          )}
        </ul>

        {/* Profile and Logout Section */}
        <div className="mt-auto pt-4 border-t border-white/10 space-y-4">
          {/* Profile */}
          <div
            className={`flex items-center ${isNavCollapsed ? 'justify-center' : 'space-x-3'}`}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {!isNavCollapsed && (
              <div className="min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-sm  truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isNavCollapsed ? 'justify-center' : ''} space-x-2 p-2 rounded ${hoverColor} transition-colors`}
          >
            <LogOut className="w-5 h-5" />
            {!isNavCollapsed && <span>Logout</span>}
          </button>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-auto bg-[#EDEDED]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
