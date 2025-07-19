import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import registerService from '../register.service';

const useGetAllOrganizations = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getAllOrganizations'],
    queryFn: () => registerService.getAllOrganizations(),
    enabled: user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN,
  });

  return result;
};

export default useGetAllOrganizations;
