import { UserProfile } from '~/types/user';
import { useToast } from '../../hooks/useToast';
import useArchiveUser from '../../services/mutations/useArchiveUser';
import useDeleteUser from '../../services/mutations/useDeleteUser';
import Modal from '../Modal/Modal';
import { Toast } from '../Toast/Toast';

interface IDeleteUserModal {
  isOpen: boolean;
  user: UserProfile;
  archive: boolean;
  onClose: (refetch: boolean) => void;
}

const DeleteUserModal = ({
  isOpen,
  user,
  archive = true,
  onClose,
}: IDeleteUserModal) => {
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const { mutateAsync: archiveUser } = useArchiveUser({
    onSuccess: () => {
      showToast('success', `Client deactivated successfully.`);
      onClose(true);
    },
    onError: () => {
      showToast('error', 'Unexpected error, contact admin.');
      onClose(false);
    },
  });

  const { mutateAsync: permanentlyDeleteUser } = useDeleteUser({
    onSuccess: () => {
      showToast('success', `Client deactivated successfully.`);
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
    if (!archive) {
      permanentlyDeleteUser({
        id: user.id,
        data: { role: user.role, organization: user.organization },
      });
    } else {
      archiveUser(user.id);
    }
    handleOnClose();
  };

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        title={archive ? 'Delete User' : 'Permanently Delete User'}
        message={`Are you sure to ${archive ? 'delete' : 'permanently delete'} user: ${user.name}?`}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default DeleteUserModal;
