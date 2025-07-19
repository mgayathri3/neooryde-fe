import ModalWithChildren from '../../components/Modal/ModalWithChildren';
import { Toast } from '../../components/Toast/Toast';
import { useToast } from '../../hooks/useToast';
import useUpdateClientStatus from '../../services/mutations/useUpdateClientStatus';
import { AccountType } from '../../types/auth';

interface IUpdateClientStatusModal {
  isOpen: boolean;
  id: number;
  accountType: AccountType.CLIENT | AccountType.VENDOR;
  status: boolean;
  name: string;
  onClose: (refetch: boolean) => void;
}

const UpdateClientStatusModal = ({
  isOpen,
  id,
  accountType,
  status,
  name,
  onClose,
}: IUpdateClientStatusModal) => {
  console.log('why is it not openint');
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const { mutateAsync } = useUpdateClientStatus({
    onSuccess: () => {
      showToast(
        'success',
        `Client ${status === true ? 'deactivated' : 'activated'} successfully.`,
      );
      onClose(true);
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
    mutateAsync({ id: id, type: accountType, isActive: !status });
  };

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <ModalWithChildren
        isOpen={isOpen}
        onClose={handleOnClose}
        title={status === true ? `Deactivate ${name}` : `Activate ${name}`}
        onSubmit={handleOnSubmit}
      >
        <div className="w-full"></div>
      </ModalWithChildren>
    </>
  );
};

export default UpdateClientStatusModal;
