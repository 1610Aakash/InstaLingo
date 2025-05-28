

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardMain = () => {
  const [activities, setActivities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      return storedUser?.name || 'Shreya';
    } catch {
      return 'Shreya';
    }
  });

  const activityKey = 'recentActivities';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(activityKey)) || [];
    setActivities(stored);
  }, []);

  const addActivity = (text) => {
    const updated = [...activities, `${text} at ${new Date().toLocaleTimeString()}`];
    setActivities(updated);
    localStorage.setItem(activityKey, JSON.stringify(updated));
  };

  const handleAction = (label, path) => {
    addActivity(label);
    navigate(path);
  };

  const clearActivities = () => {
    localStorage.removeItem(activityKey);
    setActivities([]);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const tools = [
    ['📝 Start Writing', 'Started Writing', '/features/summarization'],
    ['📄 Upload a Document', 'Uploaded Document', '/upload'],
    ['🔍 Analyze Text', 'Analyzed Text', '/features/sentiment-analysis'],
    ['💬 Ask the Bot', 'Opened Chatbot', '/features/chatbot'],
  ];

  return (
    <div className="space-y-6 relative">
      {/* Welcome + Avatar */}
      <div className="bg-blue-50 p-6 rounded-lg shadow flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
              Welcome back, {user}!
            </h2>
            <p className="text-gray-600 mt-1">What would you like to do today?</p>
          </div>
        </div>

        {/* Dropdown Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-400 transition"
          >
            {user.charAt(0).toUpperCase()}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border text-sm">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/profile');
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                👤 View Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                🔓 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map(([label, action, path], idx) => (
          <div
            key={idx}
            onClick={() => handleAction(action, path)}
            className="cursor-pointer p-6 rounded-2xl shadow-md bg-white hover:shadow-lg border hover:scale-[1.02] transition-all duration-200"
          >
            <div className="text-3xl mb-2">{label.slice(0, 2)}</div>
            <div className="text-lg font-semibold text-gray-800">{label.slice(2)}</div>
          </div>
        ))}
      </div>

      {/* Activity History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Recently Used Tools
        </h3>
        {activities.length > 0 ? (
          <>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {activities.slice(-10).reverse().map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
            <button
              onClick={clearActivities}
              className="text-sm text-red-500 underline mt-3 hover:text-red-700"
            >
              Clear History
            </button>
          </>
        ) : (
          <p className="text-gray-500">No recent activity yet.</p>
        )}
      </div>

      {/* Highlight New Feature */}
      <div className="bg-blue-100 p-4 rounded-lg shadow text-blue-800">
        💡 Try out our new <strong>Text-To-Image</strong> feature!
      </div>
    </div>
  );
};

