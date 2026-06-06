import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { registerUser } from '../store/authSlice.js';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  pin: z.string().regex(/^\d{4,6}$/)
});

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    await dispatch(registerUser(values)).unwrap();
    navigate('/customer/dashboard');
  }

  return (
    <form className="panel space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-lg font-bold">Register Customer</h2>
        <p className="text-sm text-slate-500">Create a customer profile and bank account.</p>
      </div>
      <input className="form-input" placeholder="Full name" {...register('name')} />
      <input className="form-input" placeholder="Email" type="email" {...register('email')} />
      <input className="form-input" placeholder="Password" type="password" {...register('password')} />
      <input className="form-input" placeholder="Transaction PIN" type="password" {...register('pin')} />
      {Object.keys(formState.errors).length ? (
        <p className="text-sm text-coral">Use a valid email, 8 character password, and 4 to 6 digit PIN.</p>
      ) : null}
      <button className="btn-primary w-full" disabled={status === 'loading'} type="submit">
        <UserPlus size={16} />
        Register
      </button>
      <p className="text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link className="font-semibold text-mint" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
