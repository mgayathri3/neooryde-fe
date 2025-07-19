import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ModifyFeatureRequest } from '../../types/features';
import coreService from '../core.service';

const useModifyFeatureFlagMutation = (
  props: UseMutationOptions<unknown, undefined, ModifyFeatureRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['modifyFF'],
    mutationFn: (feature: ModifyFeatureRequest): Promise<unknown> =>
      coreService.modifyFeatureFlag(feature),
    ...props,
  });

  return result;
};

export default useModifyFeatureFlagMutation;
