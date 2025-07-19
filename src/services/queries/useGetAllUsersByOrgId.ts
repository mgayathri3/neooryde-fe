import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import { IEmployeeDetailResponse } from '../../types/user';
import clientsService from '../client.service';
import vendorService from '../vendor.service';

const useGetAllUsersByOrgId = () => {
  const { user } = useAuthStore();
  const role = user?.role;

  const isEnabled = role === Roles.CLIENT_ADMIN || role === Roles.VENDOR_ADMIN;

  const queryFn = async (): Promise<IEmployeeDetailResponse> => {
    if (role === Roles.CLIENT_ADMIN && user) {
      return await clientsService.getAllEmployees(user.employerId);
    } else if (role === Roles.VENDOR_ADMIN && user) {
      return await vendorService.getAllEmployees(user.employerId);
    }
    return {} as IEmployeeDetailResponse; // Fallback for non-matching roles
  };

  return useQuery<IEmployeeDetailResponse>({
    queryKey: ['getAllUsersByOrgId', role],
    queryFn,
    enabled: isEnabled,
  });
};

export default useGetAllUsersByOrgId;
