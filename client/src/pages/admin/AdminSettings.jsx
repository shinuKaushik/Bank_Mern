export function AdminSettings() {
  return (
    <main className="panel space-y-4">
      <h2 className="text-lg font-bold">System Settings</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center justify-between rounded-md border border-slate-200 p-4">
          <span className="font-semibold">Require JWT on protected routes</span>
          <input checked readOnly className="size-4 accent-teal-700" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-md border border-slate-200 p-4">
          <span className="font-semibold">Audit critical actions</span>
          <input checked readOnly className="size-4 accent-teal-700" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-md border border-slate-200 p-4">
          <span className="font-semibold">Rate limiting enabled</span>
          <input checked readOnly className="size-4 accent-teal-700" type="checkbox" />
        </label>
        <label className="flex items-center justify-between rounded-md border border-slate-200 p-4">
          <span className="font-semibold">Role permissions enforced</span>
          <input checked readOnly className="size-4 accent-teal-700" type="checkbox" />
        </label>
      </div>
    </main>
  );
}
