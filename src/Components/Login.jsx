import { useState } from 'react';
import vignansLogo from '../assets/images.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    hallticket: '',
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      console.log('Admin Login:', formData.username, formData.password);
    } else {
      console.log('Student Login:', formData.hallticket, formData.password);
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="backdrop-blur-md bg-white/50 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <div className="flex justify-center mb-6">
          <img
            src={vignansLogo}
            alt="Vignan's Institute of Information Technology"
            className="h-19 w-auto"
          />
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              !isAdmin
                ? 'bg-black text-white'
                : 'bg-transparent text-black border border-black'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              isAdmin
                ? 'bg-black text-white'
                : 'bg-transparent text-black border border-black'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {isAdmin ? 'Admin Login' : 'Student Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdmin && (
            <div>
              <label className="block text-sm text-black mb-1">Hall Ticket</label>
              <input
                type="text"
                name="hallticket"
                value={formData.hallticket}
                onChange={handleChange}
                placeholder="Enter Hall Ticket"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}
          {isAdmin && (
            <div>
              <label className="block text-sm text-black mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-black mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
