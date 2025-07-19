import { CirclePlus, Filter, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import ClientCard from '../../../components/ClientCard/ClientCard';
import Title from '../../../components/Title/Title';
import useGetClienteleByType from '../../../services/queries/useGetClienteleByType';
import AddClientModal from './AddNewClientModal';

type FilterType = 'client' | 'vendor';

const AdminClientele = () => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('client');

  const {
    data: clientele,
    isLoading: isClienteleLoading,
    isSuccess,
    refetch: refetchClientele,
  } = useGetClienteleByType(filter);

  const onAddModalClose = (refetch: boolean) => {
    setIsAddClientModalOpen(false);
    if (refetch) {
      refetchClientele;
    }
  };

  const onClientChange = () => {
    refetchClientele();
  };

  const filterOptions = [
    {
      value: 'client',
      label: 'Clients',
      icon: UserCheck,
      count: clientele?.data.clientCount ?? 0,
    },
    {
      value: 'vendor',
      label: 'Vendors',
      icon: UserX,
      count: clientele?.data.clientCount ?? 0,
    },
  ];

  return (
    <>
      <Title text="Clientele" variant="h1" />
      <div className="flex w-full justify-between items-center mt-1">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by Type:
              </span>
            </div>

            <div className="flex space-x-2">
              {filterOptions.map(option => {
                const IconComponent = option.icon;
                const isSelected = filter === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value as FilterType)}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {option.label}
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        isSelected
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {option.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Button
          icon={CirclePlus}
          iconPosition="start"
          shape="rounded"
          variant="outlined"
          onClick={() => setIsAddClientModalOpen(true)}
        >
          Add Client
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {clientele?.data.result.map(client => (
          <ClientCard
            entity={client.baseEntity}
            key={client.baseEntity.id}
            onActivateSwitch={onClientChange}
            onDelete={onClientChange}
            linkedEntityCount={client.linkedEntities.length}
            onEditLinkedEntity={onClientChange}
            linkedEntities={client.linkedEntities}
          />
        ))}
      </div>
      <AddClientModal isOpen={isAddClientModalOpen} onClose={onAddModalClose} />
    </>
  );
};

export default AdminClientele;
