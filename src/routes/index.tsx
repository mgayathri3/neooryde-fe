import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../pages/NotFound';
import { adminRoutes } from './admin.routes';
import { clientRoutes } from './client.routes';
import { vendorRoutes } from './vendor.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      adminRoutes,
      vendorRoutes,
      clientRoutes,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
