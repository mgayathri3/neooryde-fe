import Title from '../../../components/Title/Title';
import Table, { Column } from '../../../components/Table/Table';
import React, { useState, useEffect } from 'react';
import ModalWithChildren from '../../../components/Modal/ModalWithChildren';
import axios from 'axios';
import { useAuthStore } from '~/stores/authStore';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

interface DriverData {
  
  driverId: string; 
  name: string;
  contact: string;
  dateOfJoining: string;
 
}

const DriverData = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Initial dummy data 
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

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [isCompleteProfileModalOpen, setIsCompleteProfileModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null);
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverContact, setNewDriverContact] = useState('');
  const [newDriverDateOfJoining, setNewDriverDateOfJoining] = useState('');
  const [newDriverLicenseNumber, setNewDriverLicenseNumber] = useState('');
  const [newDriverAadharNumber, setNewDriverAadharNumber] = useState('');
  const [newDriverBloodGroup, setNewDriverBloodGroup] = useState('');
  const [newDriverBaseLocation, setNewDriverBaseLocation] = useState('');

 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  // Function to handle navigation to driver details page

const handleDriverIdClick = async (driverId: string) => {
  const cabOperatorId = user?.employerId;
  const authToken = user?.access_token;
  
  if (!cabOperatorId || !authToken) {
    alert('Error: Cab Operator ID or Auth Token not available.');
    return;
  }
  
  try {
    console.log('Fetching driver details for cab operator:', cabOperatorId);
    console.log('Driver ID clicked:', driverId);
    
    // Fetch driver details using the API
    const response = await axios.get(
      `https://app.neoryde.in/api/driver/clientele/${cabOperatorId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    
    console.log('API Response:', response.data);
    
    if (response.data.statusCode === 200 || response.data.status === 'success') {
      
      const driversArray = response.data.data || response.data.drivers || [];
      console.log('Drivers array:', driversArray);
      
      if (driversArray.length > 0) {
       
        const driverDetails = driversArray[0];
        console.log('Using driver details:', driverDetails);
        
       
        navigate(`/vendor/driver-details/${driverId}`, { state: { driverDetails } });
      } else {
        console.error('No drivers found in response data');
        alert('No driver details available.');
      }
    } else {
      console.error('API returned non-success status:', response.data);
      alert('Failed to fetch driver details. ' + (response.data.message || ''));
    }
  } catch (error: any) {
    console.error("API Error:", error);
    console.error("Error details:", error.response?.data || error.message);
    alert('Error fetching driver details: ' + (error.response?.data?.message || error.message || 'Unknown error'));
  }
};

  const columns: Column<DriverData>[] = [
    {
      header: 'DRIVER ID',
      accessor: (item: DriverData) => (
        <div
          className="font-semibold text-blue-600 cursor-pointer hover:underline"
          onClick={() => handleDriverIdClick(item.driverId)}
        >
          {item.driverId}
        </div>
      ),
    },
    {
      header: 'NAME',
      accessor: (item: DriverData) => (
        <div className="flex items-center">
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
          onClick={() => handleOpenCompleteProfileModal(item)}
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
    setIsAddEntryModalOpen(true);
  };

  const handleCloseAddEntryModal = () => {
    setIsAddEntryModalOpen(false);
    setNewDriverName('');
    setNewDriverContact('');
    setNewDriverDateOfJoining('');
    setNewDriverLicenseNumber('');
    setNewDriverAadharNumber('');
    setNewDriverBloodGroup('');
    setNewDriverBaseLocation('');
  };

  const handleOpenCompleteProfileModal = (driver: DriverData) => {
    setSelectedDriver(driver);
    setIsCompleteProfileModalOpen(true);
  };

  const handleCloseCompleteProfileModal = () => {
    setIsCompleteProfileModalOpen(false);
    setSelectedDriver(null);
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

  const handleModalSubmit = async () => {
    console.log('Modal submit button clicked');
    console.log('New Driver Name:', newDriverName);
    console.log('New Driver Contact:', newDriverContact);

    const cabOperatorId = user?.employerId;
    const authToken = user?.access_token;
    const loggedInUserId = user?.id;

    if (!cabOperatorId || !authToken) {
      alert('Error: Cab Operator ID or Auth Token not available.');
      return;
    }

    const generatedUserId = 'YOUR_GENERATED_OR_RETRIEVED_UUID';

    let formattedDateOfJoining = '';
    try {
        const date = new Date(newDriverDateOfJoining);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            formattedDateOfJoining = `${year}-${month}-${day}`;
        } else {
            alert('Invalid Date of Joining format.');
            return;
        }
    } catch (error) {
        console.error("Error formatting date:", error);
        alert('Error formatting Date of Joining.');
        return;
    }

    const newDriverData = {
      userId: loggedInUserId,
      cabOperatorId: cabOperatorId,
      licenseNumber: newDriverLicenseNumber,
      aadharNumber: newDriverAadharNumber,
      isActive: true,
      dateOfJoining: formattedDateOfJoining,
      bloodGroup: newDriverBloodGroup,
      baseLocation: newDriverBaseLocation,
      name: newDriverName,
      contact: newDriverContact,
    };

    try {
      const response = await axios.post(
        `https://app.neoryde.in/api/driver`,
        newDriverData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 'success') {
        alert('New driver added successfully!');
        
        handleCloseAddEntryModal();
      } else {
        alert('Failed to add new driver.' + (response.data.message || ''));
      }
    } catch (error) {
      console.error("API Error:", error);
      alert('Error adding new driver.');
    }
  };

  const handleCompleteProfileSubmit = async () => {
    if (!selectedDriver) return;
    
    console.log('Completing profile for driver:', selectedDriver);
    
    const cabOperatorId = user?.employerId;
    const authToken = user?.access_token;
    
    if (!cabOperatorId || !authToken) {
      alert('Error: Cab Operator ID or Auth Token not available.');
      return;
    }
    
    try {
     
      const driverId = selectedDriver.driverId.replace('#', ''); // Remove # if needed
      
      const updatedDriverData = {
        licenseNumber: newDriverLicenseNumber,
        aadharNumber: newDriverAadharNumber,
        bloodGroup: newDriverBloodGroup,
        baseLocation: newDriverBaseLocation,
      };
      
      const response = await axios.put(
        `https://app.neoryde.in/api/driver/${driverId}`,
        updatedDriverData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      
      if (response.data.status === 'success') {
        alert('Driver profile completed successfully!');
        handleCloseCompleteProfileModal();
      } else {
        alert('Failed to complete driver profile.' + (response.data.message || ''));
      }
    } catch (error) {
      console.error("API Error:", error);
      alert('Error completing driver profile.');
    }
  };

  
  if (loading) {
    return <p>Loading drivers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-2">
         <Title text="Driver Data" variant="h1" />
        <div className="flex items-center">
          <div className="relative flex items-center mr-2">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-2 pl-8 pr-3 focus:outline-none focus:ring focus:border-blue-300 mr-2 border-gray-300 text-gray-700"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Button onClick={handleAddEntryClick} variant="outlined" shape="rounded" className="border-gray-300 text-gray-700">
          + Add entry
        </Button>
      </div>
      </div>
      <Table columns={columns} data={filteredDrivers || []} />

      {/* Add New Driver Modal */}
      <ModalWithChildren
        isOpen={isAddEntryModalOpen}
        onClose={handleCloseAddEntryModal}
        title="Add New Driver"
        onSubmit={handleModalSubmit}
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
              type="text"
              id="newDriverDateOfJoining"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newDriverDateOfJoining}
              onChange={handleNewDriverDateOfJoiningChange}
            />
          </div>
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
              <option value="B-">B-</option>
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
      <ModalWithChildren
        isOpen={isCompleteProfileModalOpen}
        onClose={handleCloseCompleteProfileModal}
        title={`Complete Profile: ${selectedDriver?.name || ''}`}
        onSubmit={handleCompleteProfileSubmit}
      >
        {selectedDriver && (
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="driverLicenseNumber" className="block text-gray-700 text-sm font-bold mb-2">License Number:</label>
              <input
                type="text"
                id="driverLicenseNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newDriverLicenseNumber}
                onChange={handleNewDriverLicenseNumberChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="driverAadharNumber" className="block text-gray-700 text-sm font-bold mb-2">Aadhar Number:</label>
              <input
                type="text"
                id="driverAadharNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newDriverAadharNumber}
                onChange={handleNewDriverAadharNumberChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="driverBloodGroup" className="block text-gray-700 text-sm font-bold mb-2">Blood Group:</label>
              <select
                id="driverBloodGroup"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newDriverBloodGroup}
                onChange={handleNewDriverBloodGroupChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="driverBaseLocation" className="block text-gray-700 text-sm font-bold mb-2">Base Location:</label>
              <input
                type="text"
                id="driverBaseLocation"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newDriverBaseLocation}
                onChange={handleNewDriverBaseLocationChange}
              />
            </div>
          </div>
        )}
      </ModalWithChildren>
    </div>
  );
};

export default DriverData;
