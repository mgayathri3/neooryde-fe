import createApiClient from "../utils/api";
// import { useAuthStore } from "../stores/authStore"; // Assuming your auth store provides user information

const api = createApiClient(import.meta.env.VITE_API_BASE_URL); // Make sure VITE_API_BASE_URL is correctly set

export const getDrivers = async () => {
  console.log('Fetching driver data...');
  
  // Removed code related to cabOperatorId
  // const { user } = useAuthStore.getState(); 
  // const cabOperatorId = user?.cabOperatorId; 

  // if (!cabOperatorId) {
  //   console.error('Cab operator ID not available.');
  //   return []; // Return empty array if cab operator ID is missing
  // }

  try {
    // Placeholder API call or return empty array
    // Replace with actual API call if needed, without cabOperatorId
    // const response = await api.get('some-generic-drivers-endpoint');
    // return response.json();
    return []; // Returning empty array for now
  } catch (error) {
    console.error('Error fetching driver data:', error);
    throw error; 
  }
};
