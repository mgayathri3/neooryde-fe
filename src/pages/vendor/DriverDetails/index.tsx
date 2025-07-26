import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface DriverDetailsData {
  id: string;
  name: string;
  bloodGroup: string;
  licenseNumber: string;
  dateOfBirth: string;
  hubLocation: string;
  aadharNumber: string;
  contact: string;
  gender: string;
  email: string;
  nationality: string;
  profileImageUrl: string;
  profileCompletion: number;
}

const DriverDetails: React.FC = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get driver details from navigation state
  const stateDriverDetails = (location.state as { driverDetails?: DriverDetailsData })?.driverDetails;

  const [driver, setDriver] = useState<DriverDetailsData | null>(stateDriverDetails || null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!driver && driverId) {
      // Fetch driver details by driverId if not passed via state
      // For now, simulate fetch with dummy data or you can implement API call here
      // Remove '#' if present in driverId
      const sanitizedId = driverId.startsWith('#') ? driverId : `#${driverId}`;
      // Dummy data for demonstration
      const dummyDriver: DriverDetailsData = {
        id: sanitizedId,
        name: 'Sathishkumar',
        bloodGroup: 'O+ve',
        licenseNumber: '-Not set-',
        dateOfBirth: '1986-11-20',
        hubLocation: 'Anna Nagar',
        aadharNumber: '-Not set-',
        contact: '74589 12365',
        gender: 'Male',
        email: 'Sathishkumar123@gmail.com',
        nationality: 'Indian',
        profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        profileCompletion: 75,
      };
      setDriver(dummyDriver);
    }
  }, [driver, driverId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!driver) return;
    const { name, value } = e.target;
    setDriver({
      ...driver,
      [name]: value,
    });
  };

  if (!driver) {
    return <div>Loading driver details...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Driver Data</h1>

      {/* Driver Header */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={driver.profileImageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
          alt={driver.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm mr-4"
        />
        <div>
          <h2 className="text-xl font-medium">{driver.name}</h2>
          <p className="text-gray-600">{driver.id}</p>
          <p className="text-gray-600">{driver.contact}</p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600 mr-2">Incomplete Profile</span>
            <div className="w-40 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${driver.profileCompletion}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 ml-2">{driver.profileCompletion}%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-between items-center">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              className="border-b-2 border-indigo-500 py-4 px-1 text-center text-sm font-medium text-indigo-600"
            >
              PROFILE
            </button>
            <button
              className="border-b-2 border-transparent py-4 px-1 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              TRIPS
            </button>
          </nav>
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">NAME:</p>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={driver.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.name}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">BLOOD GROUP:</p>
          {isEditing ? (
            <input
              type="text"
              name="bloodGroup"
              value={driver.bloodGroup}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.bloodGroup}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">LICENSE NUMBER:</p>
          {isEditing ? (
            <input
              type="text"
              name="licenseNumber"
              value={driver.licenseNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.licenseNumber}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">DATE OF BIRTH:</p>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={driver.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">
              {driver.dateOfBirth && !isNaN(new Date(driver.dateOfBirth).getTime())
                ? format(new Date(driver.dateOfBirth), 'MMM dd, yyyy')
                : 'N/A'}
            </p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">HUB LOCATION:</p>
          {isEditing ? (
            <input
              type="text"
              name="hubLocation"
              value={driver.hubLocation}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.hubLocation}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">AADHAR NUMBER:</p>
          {isEditing ? (
            <input
              type="text"
              name="aadharNumber"
              value={driver.aadharNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.aadharNumber}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">CONTACT:</p>
          {isEditing ? (
            <input
              type="text"
              name="contact"
              value={driver.contact}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.contact}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">GENDER:</p>
           {isEditing ? (
            <select
              name="gender"
              value={driver.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.gender}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">E-MAIL:</p>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={driver.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.email}</p>
          )}
        </div>
         <div>
          <p className="text-sm font-medium text-gray-500">NATIONALITY:</p>
          {isEditing ? (
            <input
              type="text"
              name="nationality"
              value={driver.nationality}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-900">{driver.nationality}</p>
          )}
        </div>
      </div>
      {isEditing && (
        <div>
          <div className="mt-6 flex justify-end">
             <button
              className="mr-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                // Handle save
                setIsEditing(false);
              }}
            >
              Save
            </button>
             <button
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Activate Button */}
      <div className="mt-8 flex justify-end">
        <button className="py-2 px-6 bg-gray-400 text-white rounded-md font-semibold">
          Activate
        </button>
      </div>
    </div>
  );
};

export default DriverDetails;
