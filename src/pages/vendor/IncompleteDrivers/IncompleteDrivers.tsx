import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../stores/authStore'; // Corrected import path
import { UserData } from '../../../types/auth'; // Import UserData type
import { UserProfile } from '../../../types/user'; // Import UserProfile type

interface Driver {
  id: string;
  name: string;
  profileCompleted: boolean;
  // other driver properties
}

const IncompleteDrivers: React.FC = () => {
  const { user } = useAuthStore(); // Access user from the authStore
  const [incompleteDrivers, setIncompleteDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncompleteDrivers = async () => {
      const cabOperatorId = user?.employerId;
      const authToken = user?.access_token; // Get auth token from user

      if (!cabOperatorId || !authToken) { // Check if both are available
        setError('Cab Operator ID or Auth Token not available.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/driver/clientele/${cabOperatorId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}` // Add Authorization header
            }
          }
        );
        // Access the drivers array directly under response.data
        const allDrivers: Driver[] = response.data.drivers;

        // Filter drivers with incomplete profiles
        const filteredDrivers = allDrivers.filter(driver => !driver.profileCompleted);

        setIncompleteDrivers(filteredDrivers);
      } catch (err) {
        setError('Error fetching drivers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncompleteDrivers();
  }, [user]); // Add user as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Incomplete Drivers</h1>
      {incompleteDrivers.length === 0 ? (
        <p>No incomplete profiles found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* Add other relevant headers */}
            </tr>
          </thead>
          <tbody>
            {incompleteDrivers.map(driver => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                {/* Add other relevant data cells */}
              </tr>
            ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncompleteDrivers;
