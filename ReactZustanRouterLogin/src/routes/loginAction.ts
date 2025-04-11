import { redirect } from 'react-router-dom';
import { useAuthStore } from '../auth/useAuthStore';

// Not a React hook — runs on submission
export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === '123') {
    useAuthStore.getState().login(); // ✅ call Zustand manually
    return redirect('/dashboard');
  }

  return 'Invalid credentials';
}
