import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPermanentlyDeleteUserInput } from '../../types/user';
import coreService from '../core.service';

const useDeleteUser = (
  props: UseMutationOptions<
    unknown,
    undefined,
    IPermanentlyDeleteUserInput,
    unknown
  >,
) => {
  const result = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: ({ id, data }: IPermanentlyDeleteUserInput): Promise<unknown> =>
      coreService.permanentlyDeleteUser(id, data),
    ...props,
  });

  return result;
};

export default useDeleteUser;
