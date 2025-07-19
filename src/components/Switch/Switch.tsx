import React from 'react';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg';
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: SwitchSize;
}

const sizeConfig = {
  xs: {
    switch: 'w-8 h-5',
    thumb: 'w-3.5 h-3.5',
    translate: 'translate-x-3',
  },
  sm: {
    switch: 'w-10 h-6',
    thumb: 'w-4 h-4',
    translate: 'translate-x-4',
  },
  md: {
    switch: 'w-14 h-8',
    thumb: 'w-6 h-6',
    translate: 'translate-x-6',
  },
  lg: {
    switch: 'w-16 h-9',
    thumb: 'w-7 h-7',
    translate: 'translate-x-7',
  },
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const config = sizeConfig[size];

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div
          className={`block ${config.switch} rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-[#00A980]' : 'bg-gray-300'
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white rounded-full ${config.thumb} transition-transform duration-200 ease-in-out ${
            checked
              ? `transform ${config.translate}`
              : 'transform translate-x-0'
          }`}
        />
      </div>
      {label && <span className="ml-3 text-gray-700">{label}</span>}
    </label>
  );
};
