import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import coreService from '../core.service';

const useGetClienteleByType = (type: string) => {
  const { user } = useAuthStore();

  const result = useQuery({
    queryKey: ['getClienteleByType', type],
    queryFn: () =>
      coreService.getClienteleByType(type === 'client' ? 'client' : 'vendor'),
    enabled: user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN,
  });

  return result;
};

export default useGetClienteleByType;
