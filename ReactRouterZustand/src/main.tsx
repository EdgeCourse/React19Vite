import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './routes/Home';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import { requireAuth } from './auth/requireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
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
