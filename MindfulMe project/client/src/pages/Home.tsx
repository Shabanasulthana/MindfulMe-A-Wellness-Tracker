import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">💫 Welcome to MindfulMe</h1>
      <p className="text-lg mb-4">🧠 Track moods, 📓 journal daily, 💡 get AI suggestions</p>
      <div className="text-base text-gray-700 space-y-2">
        <p>💬 "Your emotions matter. Let MindfulMe help you understand them."</p>
        <p>💬 "One journal a day keeps the stress away!"</p>
        <p>💬 "Record. Reflect. Rebuild your mind."</p>
      </div>
    </div>
  );
};
export default Home;