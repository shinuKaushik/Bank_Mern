import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function EmployeeCustomers() {
  const { data, loading } = useApiResource(async () => (await api.get('/accounts')).data, []);

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">Customer Accounts</h2>
      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-2">Customer</th>
                <th className="py-2">Email</th>
                <th className="py-2">Account</th>
                <th className="py-2">Balance</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.accounts.map((account) => (
                <tr className="border-b last:border-0" key={account._id}>
                  <td className="py-3 font-semibold">{account.userId?.name}</td>
                  <td className="py-3">{account.userId?.email}</td>
                  <td className="py-3">{account.accountNumber}</td>
                  <td className="py-3">${account.balance.toFixed(2)}</td>
                  <td className="py-3">{account.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
