import { useState, useEffect } from 'react';

const Header = ({ examTitle, userName, timeInMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(timeInMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">{examTitle}</div>
      <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">{userName}</span>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 text-lg">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
