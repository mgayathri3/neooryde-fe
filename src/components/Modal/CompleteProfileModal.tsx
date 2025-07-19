import React, { useState, useEffect } from 'react';
import ModalWithChildren from './ModalWithChildren'; // Assuming ModalWithChildren is in the same directory
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore'; // Corrected import path

interface DriverData {
  driverId: string;
  name: string;
  contact: string;
  dateOfJoining: string;
  // Add other fields as needed
}

interface CompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverData: DriverData | null; // Data for the driver being edited
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  isOpen,
  onClose,
  driverData,
}) => {
  const { user } = useAuthStore(); // Get user from auth store
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [address, setAddress] = useState('');
  const [documents, setDocuments] = useState<FileList | null>(null);

  // Pre-fill form fields when driverData changes
  useEffect(() => {
    if (driverData) {
      setName(driverData.name || '');
      setContact(driverData.contact || '');
      setDateOfJoining(driverData.dateOfJoining || '');
      setAddress(''); // Assuming address is not in initial DriverData
      setDocuments(null); // Reset documents
    }
  }, [driverData]);

  const handleSave = async () => {
    if (!driverData) return; // Should not happen if modal is opened correctly

    const cabOperatorId = user?.employerId; // Get cabOperatorId from the user object
    const authToken = user?.access_token; // Get auth token from user

    if (!cabOperatorId || !authToken) {
      alert('Error: Cab Operator ID or Auth Token not available.');
      return;
    }

    // Construct the data payload for the PUT request
    const updatePayload = {
      name: name,
      contact: contact,
      dateOfJoining: dateOfJoining,
      address: address,
      // Note: File uploads via PUT with JSON body require a different approach
      // You might need to send file data separately or use a different endpoint/method for files
    };

    try {
      const response = await axios.put( // Change method to PUT
        `https://app.neoryde.in/api/driver/${driverData.driverId}`, // Construct the URL with driverId
        updatePayload, // Send data in the request body
        {
          headers: {
            'Content-Type': 'application/json', // Change Content-Type to application/json
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 'success') { // Assuming the response structure is similar
        alert('Driver profile completed successfully!');
        onClose();
      } else {
        alert('Failed to complete driver profile.' + (response.data.message || ''));
      }
    } catch (error) {
      alert('Error saving driver profile.');
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocuments(event.target.files);
    }
  };

  return (
    <ModalWithChildren
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Driver Profile"
      onSubmit={handleSave} // Use handleSave for the submit action
    >
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // You can add disabled={!isEditable} if you want to control editability
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            Contact:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfJoining">
            Date of Joining:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfJoining"
            type="text"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documents">
            Upload Documents (Optional):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="documents"
            type="file"
            multiple // Allow multiple file uploads
            onChange={handleFileChange}
          />
        </div>
      </div>
    </ModalWithChildren>
  );
};

export default CompleteProfileModal;
