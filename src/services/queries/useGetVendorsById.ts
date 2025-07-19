import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import clientsService from '../organization.service';

const useGetVendorsById = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getVendorsById'],
    queryFn: () => user && clientsService.getVendors(user.employerId),
    enabled: user?.role === Roles.CLIENT_ADMIN,
  });

  return result;
};

export default useGetVendorsById;
