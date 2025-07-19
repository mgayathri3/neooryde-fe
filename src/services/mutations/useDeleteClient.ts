import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IClientUpdateRequest } from '../../types/clientele';
import coreService from '../core.service';

const useDeleteClient = (
  props: UseMutationOptions<unknown, undefined, IClientUpdateRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['deleteClient'],
    mutationFn: (data: IClientUpdateRequest): Promise<unknown> =>
      coreService.deleteClient(data),
    ...props,
  });

  return result;
};

export default useDeleteClient;
