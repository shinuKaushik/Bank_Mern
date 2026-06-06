import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout.jsx';
import { AuthLayout } from './layouts/AuthLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { CustomerDashboard } from './pages/customer/CustomerDashboard.jsx';
import { CustomerProfile } from './pages/customer/CustomerProfile.jsx';
import { CustomerTransactions } from './pages/customer/CustomerTransactions.jsx';
import { CustomerTransfer } from './pages/customer/CustomerTransfer.jsx';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard.jsx';
import { EmployeeCustomers } from './pages/employee/EmployeeCustomers.jsx';
import { EmployeeReports } from './pages/employee/EmployeeReports.jsx';
import { EmployeeTransactions } from './pages/employee/EmployeeTransactions.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';
import { AdminUsers } from './pages/admin/AdminUsers.jsx';
import { AdminEmployees } from './pages/admin/AdminEmployees.jsx';
import { AdminAnalytics } from './pages/admin/AdminAnalytics.jsx';
import { AdminSettings } from './pages/admin/AdminSettings.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> }
    ]
  },
  {
    element: (
      <ProtectedRoute roles={['customer']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/customer/dashboard', element: <CustomerDashboard /> },
      { path: '/customer/profile', element: <CustomerProfile /> },
      { path: '/customer/transactions', element: <CustomerTransactions /> },
      { path: '/customer/transfer', element: <CustomerTransfer /> }
    ]
  },
  {
    element: (
      <ProtectedRoute roles={['employee']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/employee/dashboard', element: <EmployeeDashboard /> },
      { path: '/employee/customers', element: <EmployeeCustomers /> },
      { path: '/employee/reports', element: <EmployeeReports /> },
      { path: '/employee/transactions', element: <EmployeeTransactions /> }
    ]
  },
  {
    element: (
      <ProtectedRoute roles={['admin']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/users', element: <AdminUsers /> },
      { path: '/admin/employees', element: <AdminEmployees /> },
      { path: '/admin/analytics', element: <AdminAnalytics /> },
      { path: '/admin/settings', element: <AdminSettings /> }
    ]
  }
]);
