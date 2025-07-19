import { useQuery } from '@tanstack/react-query';
import { getDrivers } from '../driver.service';

export const useGetAllDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: getDrivers,
  });
};
