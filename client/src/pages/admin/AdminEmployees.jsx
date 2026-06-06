import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function AdminEmployees() {
  const { data, loading } = useApiResource(async () => (await api.get('/users')).data, []);
  const employees = data?.users.filter((user) => user.role === 'employee') || [];

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">Employee Management</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="grid gap-3">
          {employees.map((employee) => (
            <div className="rounded-md border border-slate-200 p-4" key={employee._id}>
              <p className="font-semibold">{employee.name}</p>
              <p className="text-sm text-slate-500">{employee.email}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
