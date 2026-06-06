import { api } from '../../services/api.js';
import { Stat } from '../../components/Stat.jsx';
import { useApiResource } from '../../hooks/useApiResource.js';

export function EmployeeDashboard() {
  const { data, loading } = useApiResource(async () => {
    const [accounts, transactions] = await Promise.all([api.get('/accounts'), api.get('/transactions/history')]);
    return { accounts: accounts.data.accounts, transactions: transactions.data.transactions };
  }, []);

  if (loading) {
    return <main className="panel">Loading employee dashboard...</main>;
  }

  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Customer Accounts" value={data.accounts.length} />
        <Stat label="Recent Transactions" value={data.transactions.length} />
        <Stat label="Frozen Accounts" value={data.accounts.filter((account) => account.status === 'frozen').length} />
      </div>
      <section className="panel">
        <h2 className="mb-4 text-lg font-bold">Transaction Monitoring</h2>
        <div className="space-y-3">
          {data.transactions.slice(0, 8).map((transaction) => (
            <div className="flex items-center justify-between border-b pb-3 last:border-0" key={transaction._id}>
              <span className="font-semibold">{transaction.type}</span>
              <span>${transaction.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
