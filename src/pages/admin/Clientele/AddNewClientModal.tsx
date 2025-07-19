import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ModalWithChildren from '../../../components/Modal/ModalWithChildren';
import { Toast } from '../../../components/Toast/Toast';
import { IOption } from '../../../constants/AccountTypeOptions';
import { useToast } from '../../../hooks/useToast';
import {
  AddClientFormData,
  clientSchema,
} from '../../../schemas/addClient.schema';
import useCreateClientMutation from '../../../services/mutations/useCreateClient';
import { AccountType } from '../../../types/auth';

interface IAddClientModal {
  isOpen: boolean;
  onClose: (refetch: boolean) => void;
}

const AddClientModal = ({ isOpen, onClose }: IAddClientModal) => {
  const { isVisible, showToast, hideToast, message, type } = useToast();

  const {
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<AddClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      type: AccountType.EMPTY,
      isActive: true,
    },
  });

  const { mutateAsync } = useCreateClientMutation({
    onSuccess: () => {
      showToast('success', 'Client added successfully.');
      reset();
      onClose(true);
    },
    onError: () => {
      console.log('Error adding client');
      reset();
      showToast('error', 'Client already exists.');
      onClose(false);
    },
  });

  const accountTypeOptions: IOption[] = [
    { label: 'Vendor', value: AccountType.VENDOR },
    { label: 'Client', value: AccountType.CLIENT },
    { label: 'Neuryde', value: AccountType.NEURYDE },
  ];

  const handleOnClose = () => {
    onClose(false);
  };

  const handleOnSubmit = () => {
    const payload = getValues();
    if (
      payload.type !== AccountType.EMPTY &&
      payload.type !== AccountType.NEURYDE
    ) {
      mutateAsync(payload);
    }
  };

  return (
    <>
      {isVisible && (
        <Toast message={message} type={type} onClose={() => hideToast()} />
      )}
      <ModalWithChildren
        isOpen={isOpen}
        onClose={handleOnClose}
        title="Add Client"
        onSubmit={handleOnSubmit}
      >
        <div className="w-full">
          <form className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="name"
                  type="string"
                  {...register('name')}
                  className={`pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Name *"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="userAccountType"
              >
                User Type
              </label>
              <div className="relative">
                <select
                  {...register('type')}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {accountTypeOptions.map(
                    option =>
                      option.value !== AccountType.NEURYDE && (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ),
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </ModalWithChildren>
    </>
  );
};

export default AddClientModal;
