import { LucideIcon, User } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

type TextInputProps = {
  icon?: LucideIcon;
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
};

export const TextInput = ({
  icon: Icon = User,
  register,
  name,
  placeholder,
}: TextInputProps) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      {...register(name)}
      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
    />
  </div>
);
