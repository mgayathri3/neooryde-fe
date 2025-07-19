import { Outlet } from 'react-router-dom';
import Title from '../../../components/Title/Title';

interface UserData {
  //   id: number;
  name: string;
  email: string;
  phone: string;
}

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title text="Manage Users" variant="h1" />
      </div>
      <Outlet />
    </div>
  );
};

export default UserManagement;
