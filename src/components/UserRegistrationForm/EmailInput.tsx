import { Mail } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type EmailInputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export const EmailInput = ({ register, errors }: EmailInputProps) => (
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      {...register('email')}
      type="email"
      className={`pl-10 block w-full px-4 py-3 rounded-lg border ${
        errors.email ? 'border-red-500' : 'border-gray-300'
      } shadow-sm focus:ring-2 focus:ring-blue-500`}
      placeholder="E-mail *"
    />
    <ErrorMessage error={errors.email} />
  </div>
);
