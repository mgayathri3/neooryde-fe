import { useEffect, useState } from 'react';
import { useAppStore } from '../stores/appStore';

const useHasFeatureFlag = (featureFlag: string) => {
  const [hasFeatureFlag, setHasFeatureFlag] = useState(false);

  const { featureFlags } = useAppStore();

  useEffect(() => {
    if (!!featureFlags.length) {
      setHasFeatureFlag(featureFlags.some(feature => feature === featureFlag));
    }
  }, [featureFlags]);

  return hasFeatureFlag;
};

export default useHasFeatureFlag;
