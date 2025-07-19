import { CircleArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import UserRegistrationForm from '../../../components/UserRegistrationForm';
import { IOption } from '../../../constants/AccountTypeOptions';
import { AccountType, Roles } from '../../../types/auth';

const VendorRegisterUser = () => {
  const navigate = useNavigate();

  const rolesOptions: IOption[] = [
    {
      label: 'Admin',
      value: Roles.VENDOR_ADMIN,
    },
    {
      label: 'User',
      value: Roles.VENDOR_USER,
    },
  ];

  const accountTypeOptions: IOption[] = [
    { label: 'Vendor', value: AccountType.VENDOR },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <Title variant="h2" text="Add new user" />
        <CircleArrowLeft
          className="text-[#8D8A8A]"
          onClick={() => navigate('/vendor/users')}
        />
      </div>
      <UserRegistrationForm
        rolesOptions={rolesOptions}
        accountTypeOptions={accountTypeOptions}
        hideUserType={true}
        hideSelectOrg={true}
      />
    </>
  );
};

export default VendorRegisterUser;
