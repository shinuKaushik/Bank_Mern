import { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '../../services/api.js';

export function CustomerTransfer() {
  const [form, setForm] = useState({ receiverAccount: '', amount: '', pin: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);

    try {
      const { data } = await api.post('/transactions/transfer', {
        receiverAccount: form.receiverAccount.trim(),
        amount: Number(form.amount),
        pin: form.pin
      });

      setMessage(`Transfer completed to account ${data.receiver.accountNumber}.`);
      setForm({ receiverAccount: '', amount: '', pin: '' });
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Transfer failed. Please check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="panel max-w-2xl">
      <h2 className="mb-4 text-lg font-bold">Transfer Money</h2>
      <form className="space-y-4" onSubmit={submit}>
        <input className="form-input" name="receiverAccount" placeholder="Receiver account number" value={form.receiverAccount} onChange={updateField} />
        <input className="form-input" min="1" name="amount" placeholder="Amount" type="number" value={form.amount} onChange={updateField} />
        <input className="form-input" name="pin" placeholder="Transaction PIN" type="password" value={form.pin} onChange={updateField} />
        <button className="btn-primary" disabled={submitting} type="submit">
          <Send size={16} />
          {submitting ? 'Transferring...' : 'Transfer'}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm font-semibold text-mint">{message}</p> : null}
      {error ? <p className="mt-4 text-sm font-semibold text-rose-600">{error}</p> : null}
    </main>
  );
}
