import { useEffect } from 'react';
import { Switch } from '../../components/Switch/Switch';
import FeatureFlag from '../../constants/FeatureFlag';
import useRedirect from '../../hooks/useRedirect';
import useGetFeatures from '../../services/queries/useGetAllFeatures';
import { useAppStore } from '../../stores/appStore';

const Settings = () => {
  const { features } = useAppStore();

  useRedirect(FeatureFlag.SETTINGS);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Feature Flag</h1>
      {/* Polygon box with diagonal side */}
      <div className="relative bg-gray-50 shadow-md border border-gray-200 p-6 mb-6">
        {/* Custom polygon shape with diagonal side */}
        <div className="module">test</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* {features.map((feature, i) => (
          <div className="bg-white rounded-xl shadow-lg p-6" key={i + feature}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Feature Status
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{feature}</span>
              <Switch checked={true} onChange={onChangeHandler} />
            </div>
            <p className="mt-4 text-sm text-gray-500">Active</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};
export default Settings;
