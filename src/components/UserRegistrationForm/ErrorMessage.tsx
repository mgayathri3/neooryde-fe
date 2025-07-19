import React from 'react';
import type { FieldError, Merge } from 'react-hook-form';

interface ErrorMessageProps {
  error?: FieldError | Merge<FieldError, Record<string, any>>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  // Defensive: Check if error.message is a string
  if (!error || typeof error.message !== 'string') return null;

  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {error.message}
    </p>
  );
};

export default ErrorMessage;
