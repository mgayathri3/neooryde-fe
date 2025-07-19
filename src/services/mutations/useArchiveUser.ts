import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import coreService from '../core.service';

const useArchiveUser = (
  props: UseMutationOptions<unknown, undefined, string, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['archieveUser'],
    mutationFn: (data: string): Promise<unknown> =>
      coreService.archiveUser(data),
    ...props,
  });

  return result;
};

export default useArchiveUser;
