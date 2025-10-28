import React, { useState } from 'react';
// import Navbar from './components/Navbar';
import Background from './Components/Background';
import Login from './Components/Login';
import ExamPortalApp from './ExamPortal/App';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => setUser(null);

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* simple top bar with logout */}
        <div className="bg-white shadow p-4 flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user.name}</span>
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </div>
        </div>
        <ExamPortalApp />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <main className="relative z-10">
        <Login onLogin={handleLogin} />
      </main>
    </div>
  );
}

export default App;
