export function requireAuth() {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!loggedIn) {
    throw redirect('/');
  }
}
