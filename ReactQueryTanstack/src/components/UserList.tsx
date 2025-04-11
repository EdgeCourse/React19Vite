//npm install @tanstack/react-query
//infinite scroll with polling
// components/UserList.tsx
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

// Fetch a paginated list of users
const fetchUsers = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=3&_page=${pageParam}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

const UserList = () => {
  // useInfiniteQuery manages pagination
  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length < 3 ? allPages.length + 1 : undefined; // Allow max 3 pages
    },
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {/* Render users page by page */}
      {data?.pages.map((page, i) => (
        <ul key={i}>
          {page.map((user: any) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      ))}
      {/* Show Load More if more pages exist */}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </div>
  );
};

export default UserList;