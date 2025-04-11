// App.tsx
/*
Benefits of React Query Shown Here
Caching: Data is cached under the ['users'] key.

Background Fetching: React Query will refetch if window is refocused (default behavior).

Error Handling: Gracefully handles loading and error states.

No useEffect + useState: Hooks are abstracted by React Query.
*/
import React from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';

// Root component that renders the user list and form
export default function App() {
  return (
    <div>
      <h1>User Directory</h1>
      <AddUserForm />
      <UserList />
    </div>
  );
}