import { BarChart3, Landmark, LogOut, Settings, UserRound, Users, WalletCards } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice.js';

const navByRole = {
  customer: [
    ['Dashboard', '/customer/dashboard', WalletCards],
    ['Transactions', '/customer/transactions', BarChart3],
    ['Transfer', '/customer/transfer', Landmark],
    ['Profile', '/customer/profile', UserRound]
  ],
  employee: [
    ['Dashboard', '/employee/dashboard', WalletCards],
    ['Customers', '/employee/customers', Users],
    ['Reports', '/employee/reports', BarChart3],
    ['Transactions', '/employee/transactions', Landmark]
  ],
  admin: [
    ['Dashboard', '/admin/dashboard', WalletCards],
    ['Users', '/admin/users', Users],
    ['Employees', '/admin/employees', UserRound],
    ['Analytics', '/admin/analytics', BarChart3],
    ['Settings', '/admin/settings', Settings]
  ]
};

export function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link className="flex items-center gap-3 font-bold" to={`/${user.role}/dashboard`}>
            <span className="grid size-9 place-items-center rounded-md bg-mint text-white">
              <Landmark size={20} />
            </span>
            Secure Banking
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{user.name}</span>
            <button className="btn-secondary" type="button" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:block md:space-y-2">
          {navByRole[user.role].map(([label, href, Icon]) => (
            <NavLink
              className={({ isActive }) =>
                `flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-mint text-white' : 'text-steel hover:bg-white'
                }`
              }
              key={href}
              to={href}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
