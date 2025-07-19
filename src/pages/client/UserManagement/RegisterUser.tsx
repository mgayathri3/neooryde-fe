import UserRegistrationForm from '../../../components/UserRegistrationForm';
import { IOption } from '../../../constants/AccountTypeOptions';
import FeatureFlags from '../../../constants/FeatureFlag';
import useRedirect from '../../../hooks/useRedirect';
import { AccountType, Roles } from '../../../types/auth';

const ClientRegisterUser = () => {
  useRedirect(FeatureFlags.USER_REGISTERATION);
  const rolesOptions: IOption[] = [
    {
      label: 'Client Admin',
      value: Roles.CLIENT_ADMIN,
    },
    {
      label: 'Client User',
      value: Roles.CLIENT_USER,
    },
    {
      label: 'Member',
      value: Roles.MEMBER,
    },
  ];

  const accountTypeOptions: IOption[] = [
    { label: 'Client', value: AccountType.CLIENT },
  ];

  return (
    <UserRegistrationForm
      rolesOptions={rolesOptions}
      accountTypeOptions={accountTypeOptions}
    />
  );
};

export default ClientRegisterUser;
