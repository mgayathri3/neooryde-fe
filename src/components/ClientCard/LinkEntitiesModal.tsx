import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import useModifyLinkedEntities from '../../services/mutations/useModifyLinkedEntities';
import useGetClienteleByType from '../../services/queries/useGetClienteleByType';
import { AccountType } from '../../types/auth';
import {
  IBaseEntity,
  IClientAdminMapping,
  ILinkedEntity,
} from '../../types/clientMapping';
import ModalWithChildren from '../Modal/ModalWithChildren';
import { Toast } from '../Toast/Toast';

interface ILinkEntitiesModal {
  isOpen: boolean;
  selectedEntity: IBaseEntity;
  onClose: (refetch: boolean) => void;

  selectedItems: number[];
}

const LinkEntitiesModal = ({
  isOpen,
  selectedEntity,
  onClose,
  selectedItems,
}: ILinkEntitiesModal) => {
  const { isVisible, showToast, hideToast, message, type } = useToast();
  const [checkedItems, setCheckedItems] = useState<number[]>(selectedItems);
  const [isSaving, setIsSaving] = useState(false);

  const { data: clientele } = useGetClienteleByType(
    selectedEntity.type === AccountType.CLIENT ? 'vendor' : 'client',
  );

  const { mutateAsync } = useModifyLinkedEntities({
    onSuccess: () => {
      showToast('success', `Modification successful.`);
      // onClose(true);
    },
    onError: () => {
      showToast('error', 'Unexpected error, contact admin.');
      onClose(false);
    },
  });

  const handleOnClose = () => {
    onClose(false);
  };

  const handleOnSubmit = () => {
    const result = clientele?.data.result
      .filter(item => checkedItems.includes(item.baseEntity.id))
      .map(({ baseEntity }) => ({
        id: baseEntity.id,
        adminId: baseEntity.admin.id,
      }));

    if (result) {
      mutateAsync({
        baseEntity: {
          id: selectedEntity.id,
          type: selectedEntity.type,
          adminId: selectedEntity.admin.id,
        },
        linkedEntities: result,
      });
    }
  };

  const handleItemToggle = (itemId: number) => {
    setCheckedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  // Update checked items when selectedItems prop changes
  useEffect(() => {
    setCheckedItems(selectedItems);
  }, [selectedItems]);

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <ModalWithChildren
        isOpen={isOpen}
        onClose={handleOnClose}
        title={`Select entities to be linked with ${selectedEntity.name}`}
        onSubmit={handleOnSubmit}
      >
        <div className="w-full">
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {clientele &&
                clientele.data.result.map((item: IClientAdminMapping) => (
                  <div
                    key={item.baseEntity.id}
                    className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center h-5">
                      <input
                        id={`item-${item.baseEntity.id}`}
                        type="checkbox"
                        checked={checkedItems.includes(item.baseEntity.id)}
                        onChange={() => handleItemToggle(item.baseEntity.id)}
                        disabled={isSaving}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={`item-${item.baseEntity.id}`}
                          className={`block text-sm font-medium cursor-pointer ${
                            isSaving ? 'text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {item.baseEntity.name}
                        </label>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.baseEntity.type === 'VENDOR'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.baseEntity.type}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.baseEntity.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.baseEntity.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`mt-2 text-xs ${
                          isSaving ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {/* <div className="flex items-center space-x-4">
                          <span>
                            <strong>Admin:</strong> {item.baseEntity?.admin.name  ''}
                          </span>
                          <span>
                            <strong>Email:</strong>{' '}
                            {item.baseEntity.admin.email}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ModalWithChildren>
    </>
  );
};

export default LinkEntitiesModal;
