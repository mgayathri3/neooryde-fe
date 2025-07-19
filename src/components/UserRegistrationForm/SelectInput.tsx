import { ChevronDown } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import { IOption } from '../../constants/AccountTypeOptions';

type SelectInputProps = {
  label: string;
  name: string;
  options: IOption[];
  register: UseFormRegister<any>;
  error?: string;
  isLoading?: boolean;
  valueAsNumber?: boolean;
  placeholder?: string;
};

export const SelectInput = ({
  label,
  name,
  options,
  register,
  error,
  isLoading,
  valueAsNumber,
  placeholder,
}: SelectInputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
        className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
        disabled={isLoading}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(opt => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
