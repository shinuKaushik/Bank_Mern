import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function CustomerTransactions() {
  const { data, loading } = useApiResource(async () => (await api.get('/transactions/history')).data, []);

  return (
    <main className="panel">
      <h2 className="mb-4 text-lg font-bold">Transaction History</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Description</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((transaction) => (
                <tr className="border-b last:border-0" key={transaction._id}>
                  <td className="py-3 font-semibold">{transaction.type}</td>
                  <td className="py-3">${transaction.amount.toFixed(2)}</td>
                  <td className="py-3">{transaction.description}</td>
                  <td className="py-3">{new Date(transaction.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
