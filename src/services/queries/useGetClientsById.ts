import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import vendorService from '../operator.service';

const useGetClientsById = () => {
  const { user } = useAuthStore();
  const result = useQuery({
    queryKey: ['getClientsById'],
    queryFn: () => user && vendorService.getClients(user.employerId),
    enabled: user?.role === Roles.VENDOR_ADMIN,
  });

  return result;
};

export default useGetClientsById;
