import request from 'supertest';
import { app } from '../src/app.js';
import { User } from '../src/models/User.js';
import { Account } from '../src/models/Account.js';

describe('auth', () => {
  test('registers a customer with hashed password and PIN', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Asha Rao',
      email: 'asha@example.com',
      password: 'password123',
      pin: '1234'
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();

    const user = await User.findOne({ email: 'asha@example.com' }).select('+password');
    const account = await Account.findOne({ userId: user._id }).select('+pin');

    expect(user.password).not.toBe('password123');
    expect(account.pin).not.toBe('1234');
  });

  test('logs in with valid credentials', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Dev Shah',
      email: 'dev@example.com',
      password: 'password123',
      pin: '1234'
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'dev@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.body.user.role).toBe('customer');
  });
});
