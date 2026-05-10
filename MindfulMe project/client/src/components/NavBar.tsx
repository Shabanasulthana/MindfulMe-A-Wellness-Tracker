import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const user = localStorage.getItem('user');
  const isLoggedIn = !!user;

  useEffect(() => {
    if (user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name || 'User');
      setRole(parsed.role || 'user');
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold">💫 MindfulMe</h1>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-100"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative flex items-center gap-2">
            <span className="font-medium">{username}</span>
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded shadow-lg py-2 z-50">
                   <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/dashboard');
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Enter Mood/Journal
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/progress');
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Your Progress
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/history');
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Your History
                  </button>
                  {role === 'admin' && (
                    <>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate('/admin/users');
                        }}
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                      >
                         User List
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate('/admin/flagged');
                        }}
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                      >
                         Flagged Entries
                      </button>
                    </>
                  )}

                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                   Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
