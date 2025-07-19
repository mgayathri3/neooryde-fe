import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import coreService from '../core.service';

const useGetAllUsers = () => {
  const { user } = useAuthStore();
  const isEnabled =
    user?.role === Roles.ADMIN || user?.role === Roles.SUPER_ADMIN;

  const result = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: () => user && coreService.getAllUsers(),
    enabled: isEnabled,
  });

  return result;
};

export default useGetAllUsers;
