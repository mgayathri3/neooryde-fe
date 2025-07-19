import { Eye, EyeOff, Lock } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

type PasswordInputProps = {
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  register: UseFormRegister<any>;
  error?: string;
};

export const PasswordInput = ({
  showPassword,
  setShowPassword,
  register,
  error,
}: PasswordInputProps) => (
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      {...register('password')}
      type={showPassword ? 'text' : 'password'}
      className={`pl-10 block w-full px-4 py-3 rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-300'
      } shadow-sm focus:ring-2 focus:ring-blue-500`}
      placeholder="Password"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
