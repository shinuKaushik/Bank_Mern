import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const fallbackByRole = {
  customer: '/customer/dashboard',
  employee: '/employee/dashboard',
  admin: '/admin/dashboard'
};

export function ProtectedRoute({ children, roles }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={fallbackByRole[user.role] || '/login'} replace />;
  }

  return children;
}
