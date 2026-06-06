import { useState } from 'react';
import { Send, Wallet } from 'lucide-react';
import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';
import { Stat } from '../../components/Stat.jsx';

export function CustomerDashboard() {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const { data, loading, setData } = useApiResource(async () => (await api.get('/auth/profile')).data, []);

  async function submitTransaction(type) {
    const endpoint = type === 'deposit' ? '/transactions/deposit' : '/transactions/withdraw';
    const payload = type === 'deposit' ? { amount: Number(amount) } : { amount: Number(amount), pin };
    const { data: result } = await api.post(endpoint, payload);
    setData((current) => ({ ...current, account: result.account }));
    setAmount('');
    setPin('');
    setMessage(`${type === 'deposit' ? 'Deposit' : 'Withdrawal'} completed.`);
  }

  if (loading) {
    return <main className="panel">Loading account...</main>;
  }

  return (
    <main className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Account Balance" value={`$${Number(data?.account?.balance || 0).toFixed(2)}`} />
        <Stat label="Account Number" value={data?.account?.accountNumber || 'Pending'} />
        <Stat label="Status" value={data?.account?.status || 'Unknown'} />
      </div>
      <section className="panel space-y-4">
        <div>
          <h2 className="text-lg font-bold">Money Operations</h2>
          <p className="text-sm text-slate-500">Deposits and withdrawals are validated by the API.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
          <input className="form-input" min="1" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className="form-input" placeholder="PIN for withdrawal" type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
          <button className="btn-primary" type="button" onClick={() => submitTransaction('deposit')}>
            <Wallet size={16} />
            Deposit
          </button>
          <button className="btn-secondary" type="button" onClick={() => submitTransaction('withdraw')}>
            <Send size={16} />
            Withdraw
          </button>
        </div>
        {message ? <p className="text-sm font-semibold text-mint">{message}</p> : null}
      </section>
    </main>
  );
}
