import React from 'react';
// import Navbar from './components/Navbar';
import Background from './Components/Background';
import Login from './Components/Login';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <main className="relative z-10">
        <Login />
      </main>
    </div>
  );
}

export default App;
