import Title from '../../../components/Title/Title';
import Table, { Column } from '../../../components/Table/Table';
import { useState } from 'react';
import ModalWithChildren from '../../../components/Modal/ModalWithChildren'; // Assuming a ModalWithChildren component exists
import CompleteProfileModal from '../../../components/Modal/CompleteProfileModal'; // Import the new modal
import axios from 'axios'; // Import axios
import { useAuthStore } from '~/stores/authStore'; // Changed import path

interface DriverData {
  driverId: string;
  name: string;
  contact: string;
  dateOfJoining: string;
  // Add other fields as needed
}

const DriverData = () => {
  const { user } = useAuthStore(); // Get user from auth store
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false); // State to control Add Entry modal visibility
  const [newDriverName, setNewDriverName] = useState(''); // State for new driver name
  const [newDriverContact, setNewDriverContact] = useState(''); // State for new driver contact
  const [newDriverDateOfJoining, setNewDriverDateOfJoining] = useState(''); // State for date of joining
  
  // New state variables for additional fields
  const [newDriverLicenseNumber, setNewDriverLicenseNumber] = useState('');
  const [newDriverAadharNumber, setNewDriverAadharNumber] = useState('');
  const [newDriverBloodGroup, setNewDriverBloodGroup] = useState('');
  const [newDriverBaseLocation, setNewDriverBaseLocation] = useState('');

  const [isCompleteProfileModalOpen, setIsCompleteProfileModalOpen] = useState(false); // State to control Complete Profile modal visibility
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null); // State to store data of the driver whose profile is being completed

  // We will use placeholder data for now
  const [drivers, setDrivers] = useState<DriverData[]>([
    {
      driverId: '#NRD001',
      name: 'Sathishkumar',
      contact: '74589 12365',
      dateOfJoining: 'March 5, 2025',
    },
    {
      driverId: '#NRD002',
      name: 'Shivakrithik',
      contact: '74589 12366',
      dateOfJoining: 'March 5, 2025',
    },
    {
      driverId: '#NRD003',
      name: 'Sukumaran',
      contact: '74589 12367',
      dateOfJoining: 'March 5, 2025',
    },
    {
      driverId: '#NRD004',
      name: 'Dinesh Kumar',
      contact: '74589 12368',
      dateOfJoining: 'March 5, 2025',
    },
     {
      driverId: '#NRD005',
      name: 'Cristo Mon',
      contact: '74589 12369',
      dateOfJoining: 'March 5, 2025',
    },
     {
      driverId: '#NRD006',
      name: 'Kabilan Kumar',
      contact: '74589 12370',
      dateOfJoining: 'March 5, 2025',
    },
  ]);

  const handleOpenCompleteProfileModal = (driver: DriverData) => {
    setSelectedDriver(driver);
    setIsCompleteProfileModalOpen(true);
  };

  const handleCloseCompleteProfileModal = () => {
    setSelectedDriver(null);
    setIsCompleteProfileModalOpen(false);
  };

  const columns: Column<DriverData>[] = [
    {
      header: 'DRIVER ID',
      accessor: 'driverId',
      className: 'font-semibold text-blue-600',
    },
    {
      header: 'NAME',
      accessor: (item: DriverData) => (
        <div className="flex items-center">
          {/* Placeholder for circular icon */}
          <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: 'CONTACT',
      accessor: 'contact',
    },
    {
      header: 'DATE OF JOINING',
      accessor: 'dateOfJoining',
    },
    {
      header: '',
      accessor: (item: DriverData) => (
        <button
          className="text-blue-600 hover:underline"
          onClick={() => handleOpenCompleteProfileModal(item)} // Open modal on click and pass driver data
        >
          Complete profile
        </button>
      ),
    },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddEntryClick = () => {
    console.log('Add entry button clicked');
    setIsAddEntryModalOpen(true); // Open the modal
  };

  const handleCloseAddEntryModal = () => {
    setIsAddEntryModalOpen(false); // Close the modal
    // Reset form fields when closing modal
    setNewDriverName('');
    setNewDriverContact('');
    setNewDriverDateOfJoining('');
    setNewDriverLicenseNumber('');
    setNewDriverAadharNumber('');
    setNewDriverBloodGroup('');
    setNewDriverBaseLocation('');
  };

  const handleNewDriverNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverName(event.target.value);
  };

  const handleNewDriverContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverContact(event.target.value);
  };

  const handleNewDriverDateOfJoiningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverDateOfJoining(event.target.value);
  };

  // New change handlers for additional fields
  const handleNewDriverLicenseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverLicenseNumber(event.target.value);
  };

  const handleNewDriverAadharNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverAadharNumber(event.target.value);
  };

  const handleNewDriverBloodGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewDriverBloodGroup(event.target.value);
  };

  const handleNewDriverBaseLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriverBaseLocation(event.target.value);
  };


  const filteredDrivers = drivers.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleModalSubmit = async () => { // Make the function async
    console.log('Modal submit button clicked');
    console.log('New Driver Name:', newDriverName);
    console.log('New Driver Contact:', newDriverContact);

     
    const cabOperatorId = user?.employerId; // Get cabOperatorId from the user object
    const authToken = user?.access_token; // Get auth token from user
    const loggedInUserId = user?.uuid;

    if (!cabOperatorId || !authToken) {
      alert('Error: Cab Operator ID or Auth Token not available.');
      return;
    }

    // TODO: Replace with actual UUID generation or retrieval logic
    const generatedUserId = 'YOUR_GENERATED_OR_RETRIEVED_UUID'; // Replace with actual UUID

    // Reformat dateOfJoining to YYYY-MM-DD
    let formattedDateOfJoining = '';
    try {
        const date = new Date(newDriverDateOfJoining);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            formattedDateOfJoining = `${year}-${month}-${day}`;
        } else {
            // Handle invalid date input if necessary
            alert('Invalid Date of Joining format.');
            return;
        }
    } catch (error) {
        console.error("Error formatting date:", error);
        alert('Error formatting Date of Joining.');
        return;
    }


    const newDriverData = {
      userId: loggedInUserId, // Use the generated or retrieved UUID
      cabOperatorId: cabOperatorId,
      licenseNumber: newDriverLicenseNumber,
      aadharNumber: newDriverAadharNumber,
      isActive: true,
      dateOfJoining: formattedDateOfJoining, // Use the reformatted date
      bloodGroup: newDriverBloodGroup,
      baseLocation: newDriverBaseLocation,
      name: newDriverName,
      contact: newDriverContact,
    };

    try {
      const response = await axios.post( // Use axios.post for adding a new driver
        `https://app.neoryde.in/api/driver`, // API endpoint for adding a new driver
        newDriverData, // Send the new driver data in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 'success') { // Assuming the response structure is similar
        alert('New driver added successfully!');
        // TODO: Refresh the driver data table after successful submission
        // You might need to refetch the driver data from the API
        handleCloseAddEntryModal(); // Close modal after submission
      } else {
        alert('Failed to add new driver.' + (response.data.message || ''));
      }
    } catch (error) {
      console.error("API Error:", error);
      alert('Error adding new driver.');
    }
  };

  return (
    <div className="p-6">
      <Title text="Driver Data" variant="h1" />
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md py-2 pl-8 pr-3 focus:outline-none focus:ring focus:border-blue-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Add search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={handleAddEntryClick}
        >
          + Add entry
        </button>
      </div>
      <Table columns={columns} data={filteredDrivers || []} />

      {/* Placeholder Modal for Add Entry */}
      <ModalWithChildren
        isOpen={isAddEntryModalOpen}
        onClose={handleCloseAddEntryModal}
        title="Add New Driver"
        onSubmit={handleModalSubmit} // Use handleModalSubmit for the submit action
      >
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="newDriverName" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="newDriverName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverName}
              onChange={handleNewDriverNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newDriverContact" className="block text-gray-700 text-sm font-bold mb-2">Contact:</label>
            <input
              type="text"
              id="newDriverContact"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverContact}
              onChange={handleNewDriverContactChange}
            />
          </div>
           <div className="mb-4">
            <label htmlFor="newDriverDateOfJoining" className="block text-gray-700 text-sm font-bold mb-2">Date of Joining:</label>
            <input
              type="text" // Consider using a date picker for better user experience
              id="newDriverDateOfJoining"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverDateOfJoining}
              onChange={handleNewDriverDateOfJoiningChange}
            />
          </div>
           {/* New input fields */}
          <div className="mb-4">
            <label htmlFor="newDriverLicenseNumber" className="block text-gray-700 text-sm font-bold mb-2">License Number:</label>
            <input
              type="text"
              id="newDriverLicenseNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverLicenseNumber}
              onChange={handleNewDriverLicenseNumberChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newDriverAadharNumber" className="block text-gray-700 text-sm font-bold mb-2">Aadhar Number:</label>
            <input
              type="text"
              id="newDriverAadharNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverAadharNumber}
              onChange={handleNewDriverAadharNumberChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newDriverBloodGroup" className="block text-gray-700 text-sm font-bold mb-2">Blood Group:</label>
            <select
              id="newDriverBloodGroup"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverBloodGroup}
              onChange={handleNewDriverBloodGroupChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="newDriverBaseLocation" className="block text-gray-700 text-sm font-bold mb-2">Base Location:</label>
            <input
              type="text"
              id="newDriverBaseLocation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverBaseLocation}
              onChange={handleNewDriverBaseLocationChange}
            />
          </div>
        </div>
      </ModalWithChildren>

      {/* Complete Profile Modal */}
      <CompleteProfileModal
        isOpen={isCompleteProfileModalOpen}
        onClose={handleCloseCompleteProfileModal}
        driverData={selectedDriver}
      />
    </div>
  );
};

export default DriverData; // Add default export