import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import coreService from '../core.service';

const useGetAllClients = () => {
  const { user } = useAuthStore();

  const result = useQuery({
    queryKey: ['getAllClients'],
    queryFn: () => coreService.getAllClients(),
    enabled: user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN,
  });

  return result;
};

export default useGetAllClients;
