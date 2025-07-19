import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import logo from '../assets/logo.svg';
import { Toast } from '../components/Toast/Toast';
import { useToast } from '../hooks/useToast';
import { loginSchema } from '../schemas/login.schema';
import useLoginMutation from '../services/mutations/useLoginMutation';
import { useAuthStore } from '../stores/authStore';
import { AccountType, LoginResponse, Roles } from '../types/auth';

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const { mutateAsync: login, isPending: isLoginLoading } = useLoginMutation({
    onSuccess: (response: LoginResponse) => {
      setUserData(response);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data));

      const user = response.data;
      if (user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN) {
        navigate('/admin');
      } else if (
        (user?.role === Roles.CLIENT_ADMIN ||
          user?.role === Roles.CLIENT_USER) &&
        user.userAccountType === AccountType.CLIENT
      ) {
        navigate('/client');
      } else if (
        (user?.role === Roles.VENDOR_ADMIN ||
          user?.role === Roles.VENDOR_USER) &&
        user.userAccountType === AccountType.VENDOR
      ) {
        navigate('/vendor');
      }
    },
    onError: response => {
      console.log('unable to login', response);
      showToast('error', 'Invalid username or password.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData = { email: data.username, password: data.password };
      await login(loginData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#EDEDED] rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center mb-2">
                <img src={logo} alt="app_logo" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <input
                  id="username"
                  type="text"
                  {...register('username')}
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`block w-full px-4 py-3 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                {/* <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a> */}
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isLoginLoading}
                  className="w-[180px] flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#00A980] hover:bg-[#00A980] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoginLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
