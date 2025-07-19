export interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  hidden?: boolean;
}

export interface DashboardLayoutProps {
  title: string;
  navItems: NavItem[];
  bgColor: string;
  hoverColor?: string;
  isNavCollapsed: boolean;
  setNavCollapsed: (collapsed: boolean) => void;
}
