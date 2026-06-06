import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function EmployeeReports() {
  const { data, loading } = useApiResource(async () => (await api.get('/transactions/history')).data, []);

  const totalVolume = data?.transactions.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">Daily Reports</h2>
      {loading ? (
        <p>Preparing report...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Transactions Reviewed</p>
            <p className="mt-2 text-2xl font-bold">{data.transactions.length}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Transaction Volume</p>
            <p className="mt-2 text-2xl font-bold">${totalVolume.toFixed(2)}</p>
          </div>
        </div>
      )}
    </main>
  );
}
