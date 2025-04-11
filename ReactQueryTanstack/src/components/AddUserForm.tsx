import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Function to POST a new user
const addUser = async (newUser: { name: string; email: string }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error('Error creating user');
  return res.json();
};

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  // useMutation for adding a user with optimistic update
  const mutation = useMutation({
    mutationFn: addUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousData = queryClient.getQueryData(['users']);

      // Optimistically update the cache before the mutation completes
      queryClient.setQueryData(['users'], (old: any) => {
        if (!old) {
          return {
            pages: [[{ id: Date.now(), ...newUser }]],
            pageParams: [undefined],
          };
        }

        return {
          ...old,
          pages: [
            [{ id: Date.now(), ...newUser }, ...old.pages[0]],
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousData };
    },
    onError: (err, newUser, context) => {
      // Roll back optimistic update if the mutation fails
      queryClient.setQueryData(['users'], context?.previousData);
    },
    onSettled: () => {
      // Avoid invalidating immediately so optimistic update persists
      // queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email }); // Trigger the mutation
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
