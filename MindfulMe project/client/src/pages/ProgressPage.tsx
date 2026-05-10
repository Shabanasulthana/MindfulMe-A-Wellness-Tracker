import React from 'react';
import ProgressChart from '../components/ProgressChart';

const ProgressPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mood Progress</h2>
      <ProgressChart />
    </div>
  );
};

export default ProgressPage;
