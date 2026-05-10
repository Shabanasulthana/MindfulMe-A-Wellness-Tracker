import React, { useState } from 'react';

const JournalEntryForm: React.FC<{ userId: number }> = ({ userId }) => {
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async () => {
    if (!entry.trim()) {
      alert("Please write something in your journal.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/save-journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, content: entry })
      });

      const data = await res.json();
      if (data.error) {
        alert("Error saving journal: " + data.error);
        return;
      }

      setSubmitted(true);

      const aiRes = await fetch('http://localhost:5000/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Give 1 line suggestion related to my journal: "${entry}". Keep it very short.`
        })
      });

      const aiData = await aiRes.json();
      const shortSuggestion = aiData.suggestion || "No suggestion received.";
      setSuggestion(shortSuggestion);
      alert(`AI Suggestion: ${shortSuggestion}`);
      setEntry('');
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Write Your Journal</h2>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-md resize-none"
          placeholder="Reflect on your day..."
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {submitted ? 'Saved!' : 'Save Journal'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryForm;
