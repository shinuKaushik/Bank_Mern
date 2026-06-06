import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function AdminUsers() {
  const { data, loading } = useApiResource(async () => (await api.get('/users')).data, []);

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr className="border-b last:border-0" key={user._id}>
                  <td className="py-3 font-semibold">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
