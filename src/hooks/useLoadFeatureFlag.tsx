import { useEffect } from 'react';
import useGetAllFeatures from '../services/queries/useGetAllFeatures';
import useGetFeatures from '../services/queries/useGetFeatures';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../types/auth';

const useLoadFeatureFlag = () => {
  const {
    data: featureFlagSuperAdmin,
    isLoading: isLoadingAllFeatures,
    isSuccess: isSuccessAllFeatures,
  } = useGetAllFeatures();

  const {
    data: featureFlag,
    isLoading: isLoadingFeatures,
    isSuccess: isSuccessFeatures,
  } = useGetFeatures();

  const { user } = useAuthStore();

  const { setFeatures, setFeatureFlags } = useAppStore();

  useEffect(() => {
    if (
      isSuccessAllFeatures &&
      !isLoadingAllFeatures &&
      user?.role === Roles.SUPER_ADMIN
    ) {
      setFeatures(featureFlagSuperAdmin.data.features);
    }
  }, [isSuccessAllFeatures, isLoadingAllFeatures]);

  useEffect(() => {
    if (
      isSuccessFeatures &&
      !isLoadingFeatures &&
      user?.role !== Roles.SUPER_ADMIN
    ) {
      setFeatureFlags(featureFlag.data.features);
    }
  }, [isSuccessFeatures, isLoadingFeatures]);
};

export default useLoadFeatureFlag;
