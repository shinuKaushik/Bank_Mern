import request from 'supertest';
import { app } from '../src/app.js';

async function registerCustomer(email) {
  const response = await request(app).post('/api/auth/register').send({
    name: email.split('@')[0],
    email,
    password: 'password123',
    pin: '1234'
  });

  return response.body;
}

describe('transactions', () => {
  test('deposits and withdraws with balance validation', async () => {
    const { token } = await registerCustomer('money@example.com');

    const deposit = await request(app)
      .post('/api/transactions/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 500 });

    expect(deposit.status).toBe(201);
    expect(deposit.body.account.balance).toBe(500);

    const withdrawal = await request(app)
      .post('/api/transactions/withdraw')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 200, pin: '1234' });

    expect(withdrawal.status).toBe(201);
    expect(withdrawal.body.account.balance).toBe(300);
  });

  test('blocks customer access to admin user management', async () => {
    const { token } = await registerCustomer('role@example.com');

    const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});
