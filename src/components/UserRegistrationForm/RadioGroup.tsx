import { UseFormRegister } from 'react-hook-form';
import { IOption } from '../../constants/AccountTypeOptions';

type RadioGroupProps = {
  label: string;
  name: string;
  options: IOption[];
  register: UseFormRegister<any>;
  error?: string;
  disabled?: boolean;
};

export const RadioGroup = ({
  label,
  name,
  options,
  register,
  error,
  disabled = false,
}: RadioGroupProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      {label}
    </label>
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center">
          <input
            type="radio"
            value={opt.value}
            {...register(name)}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
