import React from 'react';
import { useParams } from 'react-router-dom';

const DriverDetails = () => {
  const { driverId } = useParams();

  return (
    <div className="p-6">
      <h1>Driver Details</h1>
      <p>Details for Driver ID: {driverId}</p>
      {/* You will fetch and display driver details here */}
    </div>
  );
};

export default DriverDetails;
