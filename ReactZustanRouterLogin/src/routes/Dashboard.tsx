import { useLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const data = useLoaderData() as { message: string };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
      <p className="mt-4">{data.message}</p>
    </div>
  );
}
