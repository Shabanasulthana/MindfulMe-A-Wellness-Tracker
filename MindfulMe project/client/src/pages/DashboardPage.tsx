import React from 'react';
import MoodTracker from '../components/MoodTracker';
import JournalEntryForm from '../components/JournalEntryForm';

const DashboardPage: React.FC = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser):null;

  if (!user) return <div>Please login to view your dashboard.</div>;

  return (
    <div className="p-4 space-y-4">
      <MoodTracker userId={user.id} />
      <JournalEntryForm userId={user.id} />
    </div>
  );
};

export default DashboardPage;
