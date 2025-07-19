import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ModalWithChildren from '../../../components/Modal/ModalWithChildren';

interface IAddFeatureModal {
  createFeature: (data: string) => void;
}

const AddFeatureModal = ({ createFeature }: IAddFeatureModal) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get('modal') === 'create';

  const [inputValue, setInputValue] = useState<string>('');

  const handleOnClose = () => {
    setSearchParams(undefined);
  };

  const handleOnSubmit = () => {
    if (inputValue.length > 0) {
      createFeature(inputValue);
    }
  };
  return (
    <ModalWithChildren
      isOpen={isOpen}
      onClose={handleOnClose}
      title="Create Feature Flag"
      onSubmit={handleOnSubmit}
    >
      <div className="w-full">
        <input
          id="newItem"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Feature name"
          autoComplete="off"
        />
      </div>
    </ModalWithChildren>
  );
};

export default AddFeatureModal;
