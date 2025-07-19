import { CircleCheck, CirclePlus, CircleX, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Roles } from '../../types/auth';
import { UserProfile } from '../../types/user';
import { getInitials, stringToColor } from '../../utils/colorUtils';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Table, { Column } from '../Table/Table';
import DeleteUserModal from './DeleteUserModal';

interface IListUser {
  allUsers: UserProfile[];
  onModalClose: (data: boolean) => void;
}

const ListUsers = ({ allUsers, onModalClose }: IListUser) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<UserProfile | null>(
    null,
  );
  const [archivingUserId, setArchivingUserId] = useState<UserProfile | null>(
    null,
  );

  const handleEditUser = (user: UserProfile) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser: UserProfile) => {
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: UserProfile) => {
    setDeletingUserId(userId);
  };

  const onDeleteModalClose = () => {
    setDeletingUserId(null);
    setArchivingUserId(null);
    onModalClose(true);
  };

  const stripRolePrefix = (role: string): string => {
    return role.replace(/^[A-Z]+_/, '');
  };

  const formatRole = (role: string): string => {
    return role
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const columns: Column<UserProfile>[] = [
    {
      header: 'Name',
      accessor: profile => (
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${stringToColor(profile.name)}`}
          >
            {getInitials(profile.name)}
          </div>
          <span className="font-medium text-gray-900">{profile.name}</span>
        </div>
      ),
      className: 'font-medium text-gray-900',
      sortable: true,
      sortKey: 'name',
      // width: '1fr',
    },
    {
      header: 'Email',
      accessor: 'email',
      className: 'text-gray-600',
      sortable: true,
      // width: '1.5fr',
    },
    {
      header: 'Phone',
      accessor: 'phone',
      className: 'text-gray-600 font-mono',
      sortable: true,
      // width: '1fr',
    },
    {
      header: 'Role',
      accessor: profile => {
        return user?.role === Roles.SUPER_ADMIN || user?.role === Roles.ADMIN
          ? formatRole(profile.role)
          : stripRolePrefix(profile.role);
      },

      className: 'text-gray-600 font-mono',
      sortable: true,
      sortKey: 'role',
      // width: '1fr',
    },
    {
      header: 'Organization',
      accessor: 'organization',
      className: 'text-gray-600 font-mono',
      sortable: true,
      // width: '1fr',
    },
    {
      header: 'Action',
      accessor: profile => (
        <div className="flex justify-between">
          {profile.isActive && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => handleEditUser(profile)}
            >
              <Pencil className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          {user && profile.isActive && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setArchivingUserId(profile)}
            >
              <Trash2 className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          {user && !profile.isActive && (
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <CircleCheck className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          {user && user.role === Roles.SUPER_ADMIN && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => handleDeleteUser(profile)}
            >
              <CircleX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>
      ),
      className: 'flex justify-end',
      width: '80px',
      sortable: false,
    },
  ];
  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button
          icon={CirclePlus}
          iconPosition="start"
          shape="rounded"
          variant="outlined"
          onClick={() => navigate('registration')}
        >
          Add User
        </Button>
      </div>

      {allUsers && (
        <Table
          columns={columns}
          data={allUsers}
          className="rounded-lg border border-gray-200"
          headerClassName="rounded-t-lg"
        />
      )}

      {deletingUserId && (
        <DeleteUserModal
          isOpen={deletingUserId !== null}
          user={deletingUserId}
          archive={false}
          onClose={onDeleteModalClose}
        />
      )}

      {archivingUserId && (
        <DeleteUserModal
          isOpen={archivingUserId !== null}
          user={archivingUserId}
          archive={true}
          onClose={onDeleteModalClose}
        />
      )}

      {editingUser && (
        <Modal
          isOpen={editingUser !== null}
          onClose={() => setEditingUser(null)}
          title={'Edit User'}
          message={`Feature still in progress`}
          onSubmit={() => setEditingUser(null)}
          displaySubmitButton={false}
        />
      )}
    </>
  );
};

export default ListUsers;
