import ReactDOM from 'react-dom/client';
import Login from './routes/Login';
import { loginAction } from './routes/loginAction';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import App from './App.tsx'
import Home from './routes/Home';
import About from './routes/About';
import { requireAuth } from './auth/requireAuth';
import Dashboard from './routes/Dashboard';
import './index.css';
import * as React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login />, action: loginAction },
      {
        path: 'dashboard',
        loader: async () => {
          await requireAuth();
          return { message: 'Welcome to the protected dashboard!' };
        },
        element: <Dashboard />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
