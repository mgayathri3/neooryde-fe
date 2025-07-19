import { Lock, LockOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../../components/Modal/Modal';
import { Switch } from '../../../components/Switch/Switch';
import Title from '../../../components/Title/Title';
import useCreateFeatureFlagMutation from '../../../services/mutations/useCreateFeatureFlag';
import useDeleteFeatureFlagMutation from '../../../services/mutations/useDeleteFeatureFlag';
import useModifyFeatureFlagMutation from '../../../services/mutations/useModifyFeatureFlag';
import useGetAllFeatures from '../../../services/queries/useGetAllFeatures';
import { useAppStore } from '../../../stores/appStore';
import { IFeature, ModifyFeatureRequest } from '../../../types/features';
import AddFeatureModal from './AddFeatuteModal';

const FeatureFlags = () => {
  const {
    data: featureFlag,
    isLoading: isFeatureLoading,
    isSuccess,
    refetch: refetchFeatureFlag,
  } = useGetAllFeatures();

  const [, setSearchParams] = useSearchParams();

  const { features, setFeatures } = useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFeature, setSelectedFeature] = useState<IFeature | null>();

  const { mutateAsync: createFeature, isPending: isLoginLoading } =
    useCreateFeatureFlagMutation({
      onSuccess: () => {
        setSearchParams(undefined);
        refetchFeatureFlag();
      },
      onError: () => {
        console.log('unable to create feature');
      },
    });

  const { mutateAsync: deleteFeature } = useDeleteFeatureFlagMutation({
    onSuccess: () => {
      refetchFeatureFlag();
    },
    onError: () => {
      console.log('error deleting feature');
    },
  });

  const { mutateAsync: modifyFeature } = useModifyFeatureFlagMutation({
    onSuccess: () => {
      refetchFeatureFlag();
    },
    onError: () => {
      console.log('error updating feature');
    },
  });

  useEffect(() => {
    if (isSuccess && !isFeatureLoading && featureFlag) {
      setFeatures(featureFlag.data.features);
    }
  }, [isSuccess, isFeatureLoading, featureFlag]);

  const onChangeHandler = (feature: IFeature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const onSubmitHandler = () => {
    if (selectedFeature) {
      const reqData: ModifyFeatureRequest = {
        ...selectedFeature,
        type: 'status',
        isActive: !selectedFeature?.isActive,
      };
      modifyFeature(reqData);
      setIsModalOpen(false);
      setSelectedFeature(null);
    }
  };

  const onAddFeatureSubmitHandler = (name: string) => {
    createFeature({ featureName: name });
  };

  const onDeleteFeatureHandler = (id: number) => {
    deleteFeature(id);
  };

  return (
    <div>
      <Title variant="h1" text="Feature Flags" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.length > 0 &&
          features.map((feature, i) => (
            <div
              className="bg-white rounded-xl shadow-lg p-6 relative"
              key={i + feature.featureName}
            >
              <button
                className="absolute top-3 right-9 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Edit system status card"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDeleteFeatureHandler(feature.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete system status card"
              >
                <Trash2 size={18} />
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {feature.displayName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{}</span>
                <Switch
                  checked={feature.isActive}
                  onChange={() => onChangeHandler(feature)}
                />
              </div>

              <div className="flex items-center gap-1">
                {feature.isActive ? (
                  <>
                    <LockOpen
                      strokeWidth="3"
                      className="h-4 w-4 text-green-500 transition-colors"
                    />
                    <span className="text-sm font-bold text-green-500">
                      Published
                    </span>
                  </>
                ) : (
                  <>
                    <Lock
                      strokeWidth="3"
                      className="h-4 w-4 text-red-500 transition-colors"
                    />
                    <span className="text-sm font-bold text-red-500">
                      Locked
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => setSearchParams({ modal: 'create' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#00A980] hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Add new item"
      >
        <Plus size={24} />
      </button>

      {/* Add feature modal */}
      <AddFeatureModal createFeature={onAddFeatureSubmitHandler} />
      {/* Enable / Disable Feature Modal */}
      {isModalOpen && selectedFeature && (
        <Modal
          isOpen={isModalOpen}
          title={
            selectedFeature.isActive ? `Deactivate Feature` : 'Activate Feature'
          }
          message={`Are you sure you want to ${selectedFeature.isActive ? `deactivate` : 'activate'} ${selectedFeature.displayName} feature?`}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => onSubmitHandler()}
        />
      )}
    </div>
  );
};
export default FeatureFlags;
