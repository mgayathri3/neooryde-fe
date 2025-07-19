import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ICreateClientRequest } from '../../types/clientele';
import coreService from '../core.service';

const useCreateClientMutation = (
  props: UseMutationOptions<unknown, undefined, ICreateClientRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['createClient'],
    mutationFn: (data: ICreateClientRequest): Promise<unknown> =>
      coreService.createClient(data),
    ...props,
  });

  return result;
};

export default useCreateClientMutation;
