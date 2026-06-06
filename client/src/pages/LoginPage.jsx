import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginUser } from '../store/authSlice.js';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const pathByRole = {
  customer: '/customer/dashboard',
  employee: '/employee/dashboard',
  admin: '/admin/dashboard'
};

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    const result = await dispatch(loginUser(values)).unwrap();
    navigate(pathByRole[result.user.role]);
  }

  return (
    <form className="panel space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-lg font-bold">Login</h2>
        <p className="text-sm text-slate-500">Access your role dashboard.</p>
      </div>
      <input className="form-input" placeholder="Email" type="email" {...register('email')} />
      <input className="form-input" placeholder="Password" type="password" {...register('password')} />
      {formState.errors.email || formState.errors.password ? (
        <p className="text-sm text-coral">Enter a valid email and password.</p>
      ) : null}
      <button className="btn-primary w-full" disabled={status === 'loading'} type="submit">
        <LogIn size={16} />
        Login
      </button>
      <p className="text-center text-sm text-slate-600">
        Need an account?{' '}
        <Link className="font-semibold text-mint" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
}
