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

  test('transfers funds only to a registered receiver account', async () => {
    const sender = await registerCustomer('sender@example.com');
    const receiver = await registerCustomer('receiver@example.com');

    await request(app)
      .post('/api/transactions/deposit')
      .set('Authorization', `Bearer ${sender.token}`)
      .send({ amount: 750 });

    const transfer = await request(app)
      .post('/api/transactions/transfer')
      .set('Authorization', `Bearer ${sender.token}`)
      .send({
        receiverAccount: receiver.account.accountNumber,
        amount: 250,
        pin: '1234'
      });

    expect(transfer.status).toBe(201);
    expect(transfer.body.account.balance).toBe(500);
    expect(transfer.body.receiver.accountNumber).toBe(receiver.account.accountNumber);
    expect(transfer.body.receiver.balance).toBe(250);

    const missingReceiver = await request(app)
      .post('/api/transactions/transfer')
      .set('Authorization', `Bearer ${sender.token}`)
      .send({
        receiverAccount: '00000000',
        amount: 50,
        pin: '1234'
      });

    expect(missingReceiver.status).toBe(404);
    expect(missingReceiver.body.message).toBe('Receiver account is not registered');
  });
});
