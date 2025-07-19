import { useState, useCallback, useEffect } from 'react';
import type { ToastType } from '../components/Toast/Toast';

export const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<ToastType>('info');
  const [message, setMessage] = useState('');

  const showToast = useCallback((newType: ToastType, newMessage: string) => {
    setType(newType);
    setMessage(newMessage);
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Auto-hide toast after duration
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  return {
    isVisible,
    type,
    message,
    showToast,
    hideToast,
  };
};
