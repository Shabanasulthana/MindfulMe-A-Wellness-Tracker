import React, { useEffect, useState } from 'react';

interface MoodEntry {
  date: string;
  mood_level: number;
}

interface JournalEntry {
  date: string;
  content: string;
}

const HistoryPage: React.FC = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/mood')
      .then(res => res.json())
      .then(data => setMoods(data))
      .catch(err => console.error('Error fetching moods:', err));

    fetch('http://localhost:5000/get_journals', { method: 'POST' })
      .then(res => res.json())
      .then(data => setJournals(data))
      .catch(err => console.error('Error fetching journals:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📝 Mood & Journal History</h2>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Mood History</h3>
        <ul className="space-y-2">
          {moods.map((entry, idx) => (
            <li key={idx} className="flex justify-between px-4 py-2 bg-blue-50 rounded">
              <span>{entry.date}</span>
              <span>😊 Mood Level: {entry.mood_level}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Journal History</h3>
        <ul className="space-y-2">
          {journals.map((entry, idx) => (
            <li key={idx} className="px-4 py-2 bg-green-50 rounded">
              <div className="text-sm text-gray-600">{entry.date}</div>
              <div>{entry.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;
