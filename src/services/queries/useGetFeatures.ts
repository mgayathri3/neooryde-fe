import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import coreService from '../core.service';

const useGetFeatures = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getFeatures'],
    queryFn: () => coreService.getFeatures(),
    enabled: user?.role !== Roles.SUPER_ADMIN,
  });

  return result;
};

export default useGetFeatures;
