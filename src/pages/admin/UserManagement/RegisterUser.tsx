import { CircleArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import UserRegistrationForm from '../../../components/UserRegistrationForm';
import { accountTypeOptions } from '../../../constants/AccountTypeOptions';
import { rolesOptions } from '../../../constants/RolesOptions';

const AdminRegisterUser = () => {
  const navigate = useNavigate();

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
      />
    </>
  );
};

export default AdminRegisterUser;
