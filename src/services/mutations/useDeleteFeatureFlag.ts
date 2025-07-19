import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import coreService from '../core.service';

const useDeleteFeatureFlagMutation = (
  props: UseMutationOptions<unknown, undefined, number, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['deleteFF'],
    mutationFn: (featureId: number): Promise<unknown> =>
      coreService.deleteFeatureFlag(featureId),
    ...props,
  });

  return result;
};

export default useDeleteFeatureFlagMutation;
