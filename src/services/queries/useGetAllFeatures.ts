import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import coreService from '../core.service';

const useGetAllFeatures = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getAllFeatures'],
    queryFn: () => coreService.getAllFeatures(),
    enabled: user?.role === Roles.SUPER_ADMIN,
  });

  return result;
};

export default useGetAllFeatures;
