import React, { useEffect, useState } from 'react';

interface FlaggedEntry {
  flagged_id: number;
  journal_id: number;
  user_id: number;
  content: string;
  reason: string;
  flagged_at: string;
}

const FlaggedEntries: React.FC = () => {
  const [entries, setEntries] = useState<FlaggedEntry[]>([]);

  useEffect(() => {
    const fetchFlaggedEntries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/flagged');
        const data = await response.json();
        setEntries(data.flagged_entries || []);
      } catch (error) {
        console.error('Error fetching flagged entries:', error);
      } 
    };

    fetchFlaggedEntries();
  }, []);

  if (entries.length === 0) {
    return <p className="text-center mt-4">No flagged entries found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flagged Journal Entries</h2>
      {entries.map(entry => (
        <div key={entry.flagged_id} className="border p-4 rounded mb-4 shadow">
          <p><strong>Journal ID:</strong> {entry.journal_id}</p>
          <p><strong>User ID:</strong> {entry.user_id}</p>
          <p><strong>Content:</strong> {entry.content}</p>
          <p><strong>Reason:</strong> {entry.reason}</p>
          <p><strong>Flagged At:</strong> {entry.flagged_at}</p>
        </div>
      ))}
    </div>
  );
};

export default FlaggedEntries;
