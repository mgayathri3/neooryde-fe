import React from 'react';
import { useAppStore } from '../../stores/appStore';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonShape = 'rounded' | 'rectangle';
type IconPosition = 'start' | 'end';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: React.ElementType;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const shapeStyles = {
  rounded: 'rounded-full',
  rectangle: 'rounded-lg',
};

const sizeStyles = {
  base: 'px-4 py-2 text-sm font-medium',
  withIcon: 'px-3 py-2 text-sm font-medium',
};

const Button = ({
  children,
  variant = 'filled',
  shape = 'rectangle',
  icon: Icon,
  iconPosition = 'start',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const theme = useAppStore(state => state.currentTheme);

  const variantStyles = {
    filled: `${theme.primary.background} text-white ${theme.primary.hover} shadow-sm`,
    outlined: `border-2 border-[#00A980] text-[#00A980]`,
    text: 'text-blue-600 hover:bg-blue-50',
  };

  const baseStyles = [
    'inline-flex items-center justify-center',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'cursor-pointer',
    variantStyles[variant],
    shapeStyles[shape],
    Icon ? sizeStyles.withIcon : sizeStyles.base,
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  const iconSize = 16;
  const iconClassName = 'flex-shrink-0';
  const iconStyles = {
    start: 'mr-2',
    end: 'ml-2',
  };

  return (
    <button className={baseStyles} disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'start' && (
            <Icon
              size={iconSize}
              className={`${iconClassName} ${iconStyles[iconPosition]}`}
            />
          )}
          {children}
          {Icon && iconPosition === 'end' && (
            <Icon
              size={iconSize}
              className={`${iconClassName} ${iconStyles[iconPosition]}`}
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
