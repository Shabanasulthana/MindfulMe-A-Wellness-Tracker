import React from 'react';
import MoodTracker from '../components/MoodTracker';

const MoodPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          😊 Mood Tracking
        </h1>
        {userId ? (
          <MoodTracker userId={userId} />
        ) : (
          <p className="text-center text-red-600">User not logged in</p>
        )}
      </div>
    </div>
  );
};

export default MoodPage;
