import {
  Building2,
  Edit,
  ExternalLink,
  Trash2,
  User,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { AccountType, Roles } from '../../types/auth';
import { IBaseEntity, ILinkedEntity } from '../../types/clientMapping';
import { Switch } from '../Switch/Switch';
import DeleteClientModal from './DeleteClientModal';
import LinkEntitiesModal from './LinkEntitiesModal';
import UpdateClientStatusModal from './UpdateClientStatusModal';

export interface IClientProps {
  entity: IBaseEntity;
  onActivateSwitch?: () => void;
  onDelete?: () => void;
  onEditLinkedEntity?: () => void;
  linkedEntityCount?: number;
  linkedEntities?: ILinkedEntity[];
}

const ClientCard = ({
  entity,
  onActivateSwitch,
  onDelete,
  onEditLinkedEntity,
  linkedEntityCount = 0,
  linkedEntities,
}: IClientProps) => {
  const { user } = useAuthStore();

  const showAdminOption =
    user?.role === Roles.ADMIN || user?.role === Roles.SUPER_ADMIN;

  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLinkEntityModalOpen, setIsLinkEntityModalOpen] = useState(false);

  const isModificationAllowedOnEntity =
    entity.type === AccountType.CLIENT || entity.type === AccountType.VENDOR;

  const onStatusUpdateModalClose = () => {
    setIsStatusUpdateModalOpen(false);
    if (onActivateSwitch) {
      onActivateSwitch();
    }
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

  const onLinkEntityModalClose = () => {
    setIsLinkEntityModalOpen(false);
    if (onEditLinkedEntity) {
      onEditLinkedEntity();
    }
  };

  return (
    <>
      <div
        key={entity.id}
        className="bg-[#FAF9F9] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
      >
        <div className="absolute top-4 right-4">
          {showAdminOption && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <Trash2 className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4">
            {entity.logo ? (
              <img
                src={entity.logo}
                alt={entity.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                <User color="#00A980" />
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {entity.name}
              </h3>
              <p className="text-sm text-gray-500">ID: {entity.id}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="h-4 w-4 mr-2" />
              {entity.type}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 group">
              <div className="flex items-center">
                <Workflow className="h-4 w-4 mr-2" />
                {linkedEntityCount}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center">
            <button
              onClick={() => setIsLinkEntityModalOpen(true)}
              className={`inline-flex items-center text-sm font-medium transition-colors ${
                entity.isActive
                  ? 'text-blue-600 hover:text-blue-700 cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title={
                entity.isActive
                  ? 'Edit user permissions'
                  : 'Cannot edit - user is inactive'
              }
            >
              <Edit className="h-4 w-4 mr-2" />
              {`Modify linked ${entity.type === AccountType.CLIENT ? 'vendors' : 'clients'}`}
            </button>
            {/* <Link
              to={`/admin/users/${id}`}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Details
            </Link>
            <ExternalLink color="#5D97ED" className="h-4 w-4 ml-1 disabled" /> */}
          </div>
          {showAdminOption && (
            <Switch
              checked={entity.isActive}
              size="sm"
              onChange={() => {
                setIsStatusUpdateModalOpen(true);
              }}
            />
          )}
        </div>
      </div>
      {isStatusUpdateModalOpen && isModificationAllowedOnEntity && (
        <UpdateClientStatusModal
          isOpen={isStatusUpdateModalOpen}
          status={entity.isActive}
          id={entity.id}
          accountType={entity.type}
          name={entity.name}
          onClose={onStatusUpdateModalClose}
        />
      )}
      {isDeleteModalOpen && isModificationAllowedOnEntity && (
        <DeleteClientModal
          isOpen={isDeleteModalOpen}
          status={entity.isActive}
          id={entity.id}
          accountType={entity.type}
          name={entity.name}
          onClose={onDeleteModalClose}
        />
      )}
      {isLinkEntityModalOpen && isModificationAllowedOnEntity && entity && (
        <LinkEntitiesModal
          selectedItems={
            linkedEntities
              ? linkedEntities
                  .filter(item => item.isActive)
                  .map(item => item.id)
              : []
          }
          selectedEntity={entity}
          isOpen={isLinkEntityModalOpen}
          onClose={onLinkEntityModalClose}
        />
      )}
    </>
  );
};

export default ClientCard;
