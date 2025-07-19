import { useToast } from '../../hooks/useToast';
import useDeleteClient from '../../services/mutations/useDeleteClient';
import { AccountType } from '../../types/auth';
import Modal from '../Modal/Modal';
import { Toast } from '../Toast/Toast';

interface IDeleteClientModal {
  isOpen: boolean;
  id: number;
  accountType: AccountType.CLIENT | AccountType.VENDOR;
  status: boolean;
  name: string;
  onClose: (refetch: boolean) => void;
}

const DeleteClientModal = ({
  isOpen,
  id,
  accountType,
  status,
  name,
  onClose,
}: IDeleteClientModal) => {
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const { mutateAsync } = useDeleteClient({
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
    mutateAsync({ id: id, type: accountType });
  };

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        title={'Delete Client'}
        message={`Are you sure to remove ${name}?`}
        onSubmit={handleOnSubmit}
      ></Modal>
    </>
  );
};

export default DeleteClientModal;
