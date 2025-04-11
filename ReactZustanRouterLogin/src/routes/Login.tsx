import { Form, useActionData } from 'react-router-dom';

export default function Login() {
  const error = useActionData() as string | undefined;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-semibold">Username</label>
          <input name="username" className="border px-2 py-1 w-full" />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold">Password</label>
          <input type="password" name="password" className="border px-2 py-1 w-full" />
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Log In
        </button>
      </Form>
    </div>
  );
}
