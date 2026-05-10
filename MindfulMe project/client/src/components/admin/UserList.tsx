import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface Mood {
  date: string;
  mood_level: number;
}
interface Journal {
  date: string;
  content: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [history, setHistory] = useState<{ moods: Mood[]; journals: Journal[] }>({ moods: [], journals: [] });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/history/${user.id}`);
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">All Users</h2>
      <ul className="space-y-2 mb-6">
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            className="cursor-pointer border p-2 rounded hover:bg-gray-100"
          >
            {user.name} — {user.email} — ({user.role})
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            History for {selectedUser.name}
          </h3>

          <h4 className="font-bold">Mood Logs:</h4>
          <ul className="list-disc list-inside mb-4">
            {history.moods.length > 0 ? (
              history.moods.map((mood, i) => (
                <li key={i}>{mood.date}: Mood Level {mood.mood_level}</li>
              ))
            ) : (
              <li>No mood entries</li>
            )}
          </ul>

          <h4 className="font-bold">Journal Entries:</h4>
          <ul className="list-disc list-inside">
            {history.journals.length > 0 ? (
              history.journals.map((j, i) => (
                <li key={i}>
                  <p className="font-medium">{j.date}</p>
                  <p className="text-sm text-gray-700">{j.content}</p>
                </li>
              ))
            ) : (
              <li>No journal entries</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
