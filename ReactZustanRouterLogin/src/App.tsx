/*
npm install
npm install react-router-dom zustand

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
*/

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from './auth/useAuthStore';

export default function App() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6 text-blue-600 font-semibold">

  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  {!isLoggedIn && <Link to="/login">Login</Link>}
  {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}


        
      </nav>


      <div className="mb-6">
        {isLoggedIn ? (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={login}
          >
            Login
          </button>
        )}
      </div>

      <Outlet />
    </div>
  );
}
 