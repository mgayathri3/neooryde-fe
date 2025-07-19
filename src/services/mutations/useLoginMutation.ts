import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import coreService from '../core.service';
import { LoginCredentials, LoginResponse } from '../../types/auth';

const useLoginMutation = (
  props: UseMutationOptions<
    LoginResponse,
    undefined,
    LoginCredentials,
    unknown
  >,
) => {
  const result = useMutation({
    mutationKey: ['login'],
    mutationFn: (userdata: LoginCredentials): Promise<LoginResponse> =>
      coreService.login(userdata),
    ...props,
  });

  return result;
};

export default useLoginMutation;
