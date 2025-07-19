import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IClientMappingRequest } from '../../types/clientMapping';
import coreService from '../core.service';

const useModifyLinkedEntities = (
  props: UseMutationOptions<unknown, undefined, IClientMappingRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['modifyLinkedEntities'],
    mutationFn: (data: IClientMappingRequest): Promise<unknown> =>
      coreService.linkEntities(data),
    ...props,
  });

  return result;
};

export default useModifyLinkedEntities;
