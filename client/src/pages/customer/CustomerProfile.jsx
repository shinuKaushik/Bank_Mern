import { api } from '../../services/api.js';
import { useApiResource } from '../../hooks/useApiResource.js';

export function CustomerProfile() {
  const { data, loading } = useApiResource(async () => (await api.get('/auth/profile')).data, []);

  if (loading) {
    return <main className="panel">Loading profile...</main>;
  }

  return (
    <main className="panel space-y-4">
      <h2 className="text-lg font-bold">Profile</h2>
      <dl className="grid gap-4 md:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">Name</dt>
          <dd className="font-semibold">{data.user.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Email</dt>
          <dd className="font-semibold">{data.user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Role</dt>
          <dd className="font-semibold">{data.user.role}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Account</dt>
          <dd className="font-semibold">{data.account?.accountNumber}</dd>
        </div>
      </dl>
    </main>
  );
}
