import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState('');

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');

    // Apply mask: (XXX) XXX-XXXX
    let formatted = '';
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length > 3) formatted += digits.slice(3, 5);
    if (digits.length > 5) formatted += '-' + digits.slice(5, 10);

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');

    // Limit to 10 digits
    if (digits.length <= 10) {
      onChange(digits);
    }
  };

  useEffect(() => {
    setDisplayValue(formatPhoneNumber(value));
  }, [value]);

  return (
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="tel"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder="55555-55555"
        className={`pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
};
