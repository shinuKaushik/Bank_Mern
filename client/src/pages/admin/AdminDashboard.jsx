import { api } from '../../services/api.js';
import { Stat } from '../../components/Stat.jsx';
import { useApiResource } from '../../hooks/useApiResource.js';

export function AdminDashboard() {
  const { data, loading } = useApiResource(async () => {
    const [users, accounts, transactions] = await Promise.all([api.get('/users'), api.get('/accounts'), api.get('/transactions/history')]);
    return {
      users: users.data.users,
      accounts: accounts.data.accounts,
      transactions: transactions.data.transactions
    };
  }, []);

  if (loading) {
    return <main className="panel">Loading admin dashboard...</main>;
  }

  return (
    <main className="grid gap-4 md:grid-cols-3">
      <Stat label="Users" value={data.users.length} />
      <Stat label="Accounts" value={data.accounts.length} />
      <Stat label="Transactions" value={data.transactions.length} />
    </main>
  );
}
