import { Landmark } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#eef4f0] px-4 py-10">
      <section className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md bg-mint text-white">
            <Landmark size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Secure Banking</h1>
            <Link className="text-sm text-mint" to="/login">
              Role-based banking platform
            </Link>
          </div>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
