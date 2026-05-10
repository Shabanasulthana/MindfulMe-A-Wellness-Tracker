import React from 'react';
import JournalEntryForm from '../components/JournalEntryForm';

const JournalPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">📓 Daily Journal</h1>
        {userId ? (
          <JournalEntryForm userId={userId} />
        ) : (
          <p className="text-center text-red-600">User not logged in</p>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
