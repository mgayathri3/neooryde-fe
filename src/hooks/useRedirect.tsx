import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../types/auth';

const useRedirect = (featureFlag: string, redirectUrl?: string) => {
  const navigate = useNavigate();

  const { features } = useAppStore();

  const { user } = useAuthStore();

  const handleRedirect = useCallback(() => {
    if (user?.role.includes('ADMIN')) {
      navigate('/admin');
    } else if (user?.role === Roles.VENDOR_USER) {
      navigate('/vendor');
    } else if (user?.role === Roles.CLIENT_USER) {
      navigate('/client');
    } else {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (
      user?.role !== Roles.SUPER_ADMIN &&
      !!features.length &&
      !features.some(
        feature => feature?.featureName === featureFlag && feature.isActive,
      )
    ) {
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        handleRedirect();
      }
    }
  }, [features, handleRedirect]);
};

export default useRedirect;
