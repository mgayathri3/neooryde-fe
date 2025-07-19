import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUpdateClientStatusRequest } from '../../types/clientele';
import coreService from '../core.service';

const useUpdateClientStatus = (
  props: UseMutationOptions<
    unknown,
    undefined,
    IUpdateClientStatusRequest,
    unknown
  >,
) => {
  const result = useMutation({
    mutationKey: ['updateClientStatus'],
    mutationFn: (data: IUpdateClientStatusRequest): Promise<unknown> =>
      coreService.updateClientStatus(data),
    ...props,
  });

  return result;
};

export default useUpdateClientStatus;
