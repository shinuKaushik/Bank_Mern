import { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '../../services/api.js';

export function CustomerTransfer() {
  const [form, setForm] = useState({ receiverAccount: '', amount: '', pin: '' });
  const [message, setMessage] = useState('');

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    await api.post('/transactions/transfer', { ...form, amount: Number(form.amount) });
    setMessage('Transfer completed.');
    setForm({ receiverAccount: '', amount: '', pin: '' });
  }

  return (
    <main className="panel max-w-2xl">
      <h2 className="mb-4 text-lg font-bold">Transfer Money</h2>
      <form className="space-y-4" onSubmit={submit}>
        <input className="form-input" name="receiverAccount" placeholder="Receiver account number" value={form.receiverAccount} onChange={updateField} />
        <input className="form-input" min="1" name="amount" placeholder="Amount" type="number" value={form.amount} onChange={updateField} />
        <input className="form-input" name="pin" placeholder="Transaction PIN" type="password" value={form.pin} onChange={updateField} />
        <button className="btn-primary" type="submit">
          <Send size={16} />
          Transfer
        </button>
      </form>
      {message ? <p className="mt-4 text-sm font-semibold text-mint">{message}</p> : null}
    </main>
  );
}
