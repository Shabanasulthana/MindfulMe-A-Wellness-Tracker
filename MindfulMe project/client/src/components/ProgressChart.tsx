import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  date: string;
  mood_level: number;
}

const ProgressChart: React.FC = () => {
  const [data, setData] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/mood')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to fetch:', err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Mood Progress Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood_level" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
