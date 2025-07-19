import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RegisterUserRequest } from '../../types/registerUser';
import registerService from '../register.service';

const useRegisterMutation = (
  props: UseMutationOptions<unknown, undefined, RegisterUserRequest, unknown>,
) => {
  const result = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (userdata: RegisterUserRequest): Promise<unknown> =>
      registerService.register(userdata),
    ...props,
  });

  return result;
};

export default useRegisterMutation;
