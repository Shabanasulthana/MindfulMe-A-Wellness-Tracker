import React, { useState } from 'react';

const emojiOptions = [
  { emoji: '😞', label: 'Tired' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Fine' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '😁', label: 'Excited' }
];

const questions = [
  'How was your energy today?',
  'How was your mood overall?',
  'How motivated did you feel?'
];

const MoodTracker: React.FC<{ userId: number }> = ({ userId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([0, 0, 0]);
  const [submitted, setSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleEmojiClick = (val: number) => {
    const updated = [...answers];
    updated[currentQuestion] = val;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    const totalMood = Math.round((answers[0] + answers[1] + answers[2]) / 3);

    await fetch('http://localhost:5000/api/save-mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, mood_level: totalMood })
    });

    setSubmitted(true);

    const aiRes = await fetch('http://localhost:5000/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Give 1 line short suggestion to improve my average mood today (${totalMood}/5). Keep it very short.`
      })
    });

    const aiData = await aiRes.json();
    const shortSuggestion = aiData.suggestion || "No suggestion received.";
    setSuggestion(shortSuggestion);
    alert(`AI Suggestion: ${shortSuggestion}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Daily Mood Check-In</h2>
        {!submitted ? (
          <>
            <p className="mb-3 text-lg font-medium">{questions[currentQuestion]}</p>
            <div className="flex justify-center gap-6 mb-4">
              {emojiOptions.map((option, i) => (
                <div key={i} className="flex flex-col items-center">
                  <button
                    onClick={() => handleEmojiClick(i + 1)}
                    className={`text-3xl px-4 py-2 rounded-full border transition ${
                      answers[currentQuestion] === i + 1 ? 'bg-purple-200' : 'bg-gray-100'
                    }`}
                  >
                    {option.emoji}
                  </button>
                  <span className="mt-1 text-sm text-gray-700">{option.label}</span>
                </div>
              ))}
            </div>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </>
        ) : (
          <p className="text-green-600 font-medium mt-3">✅ Mood submitted successfully!</p>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
