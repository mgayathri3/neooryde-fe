import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import registerService from '../register.service';

const useGetAllOperators = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getAllOperators'],
    queryFn: () => registerService.getAllOperators(),
    enabled: user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN,
  });

  return result;
};

export default useGetAllOperators;
