import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { FeaturesRequest } from '../../types/features';
import coreService from '../core.service';

const useCreateFeatureFlagMutation = (
  props: UseMutationOptions<unknown, undefined, FeaturesRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['createFF'],
    mutationFn: (feature: FeaturesRequest): Promise<unknown> =>
      coreService.createFeatureFlag(feature),
    ...props,
  });

  return result;
};

export default useCreateFeatureFlagMutation;
