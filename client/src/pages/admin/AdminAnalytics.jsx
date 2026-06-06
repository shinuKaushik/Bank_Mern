import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function AdminAnalytics() {
  const { data, loading } = useApiResource(async () => (await api.get('/transactions/history')).data, []);
  const totals = data?.transactions.reduce(
    (acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
      return acc;
    },
    {}
  );

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">Transaction Analytics</h2>
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(totals).map(([type, amount]) => (
            <div className="rounded-md border border-slate-200 p-4" key={type}>
              <p className="text-sm text-slate-500">{type}</p>
              <p className="mt-2 text-2xl font-bold">${amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
