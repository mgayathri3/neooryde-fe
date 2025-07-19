import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IOption } from '../../constants/AccountTypeOptions';
import { useToast } from '../../hooks/useToast';
import { RegisterUserFormData, userSchema } from '../../schemas/user.schema';
import useRegisterMutation from '../../services/mutations/useRegisterUser';
import useGetAllOperators from '../../services/queries/useGetAllOperators';
import useGetAllOrganizations from '../../services/queries/useGetAllOrganizations';
import { useAuthStore } from '../../stores/authStore';
import { AccountType, Roles } from '../../types/auth';
import { GetAll } from '../../types/response';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import { Toast } from '../Toast/Toast';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RadioGroup } from './RadioGroup';
import { SelectInput } from './SelectInput';
import { TextInput } from './TextInput';

interface IUserRegistrationProps {
  rolesOptions: IOption[];
  accountTypeOptions: IOption[];
  hideUserType?: boolean;
  hideSelectOrg?: boolean;
}

const UserRegistrationForm = ({
  rolesOptions,
  accountTypeOptions,
  hideUserType = false,
  hideSelectOrg = false,
}: IUserRegistrationProps) => {
  const { user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const { data: operators = { data: [] }, isLoading: isOperatorLoading } =
    useGetAllOperators();
  const {
    data: organizations = { data: [] },
    isLoading: isOrganizationLoading,
  } = useGetAllOrganizations();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      userAccountType: user?.userAccountType ?? AccountType.EMPTY,
      role: Roles.EMPTY,
      orgId: user?.employerId ?? 0,
    },
  });

  const phone = watch('phone');
  const selectedUserType = watch('userAccountType');

  const { mutateAsync: registerUser, isPending: isLoading } =
    useRegisterMutation({
      onSuccess: () => {
        showToast('success', 'User registered successfully.');
        reset();
      },
      onError: () => {
        showToast('error', 'Unable to register user');
      },
    });

  const onSubmit = async (data: RegisterUserFormData) => {
    await registerUser(data);
  };

  // Automatically set default values based on user role
  useEffect(() => {
    if (user?.userAccountType) {
      setValue('userAccountType', user.userAccountType);
      setValue('orgId', user.employerId);
    }
  }, [user, setValue]);

  const orgOptions = useMemo(() => {
    if (selectedUserType === AccountType.VENDOR) return operators.data;
    if (selectedUserType === AccountType.CLIENT) return organizations.data;
    return [];
  }, [selectedUserType, operators, organizations]);

  return (
    <div>
      {isVisible && <Toast message={message} type={type} onClose={hideToast} />}

      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            icon={User}
            register={register}
            name="name"
            placeholder="Name *"
          />
          <EmailInput register={register} errors={errors} />
          <PhoneInput
            value={phone}
            onChange={value =>
              setValue('phone', value, { shouldValidate: true })
            }
          />
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            register={register}
            error={errors.password?.message}
          />

          <RadioGroup
            label="Role"
            name="role"
            options={rolesOptions}
            register={register}
            error={errors.role?.message}
            disabled={isLoading}
          />

          {!hideUserType && (
            <SelectInput
              label="User Type"
              name="userAccountType"
              options={accountTypeOptions}
              register={register}
              error={errors.userAccountType?.message}
              placeholder={'Select User Type'}
            />
          )}

          {!hideSelectOrg && (
            <SelectInput
              label="Select Organization"
              name="orgId"
              options={orgOptions.map(o => ({ value: o.id, label: o.name }))}
              register={register}
              error={errors.orgId?.message}
              isLoading={isOperatorLoading || isOrganizationLoading}
              valueAsNumber
              placeholder={'Select Organization'}
            />
          )}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-[180px] flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#00A980] hover:bg-[#00A980] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
