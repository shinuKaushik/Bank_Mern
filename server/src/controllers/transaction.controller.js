import mongoose from 'mongoose';
import { Account } from '../models/Account.js';
import { Transaction } from '../models/Transaction.js';
import { Transfer } from '../models/Transfer.js';
import { HttpError, notFound } from '../utils/httpError.js';
import { writeAudit } from '../services/audit.service.js';

async function getCustomerAccount(userId, includePin = false) {
  const query = Account.findOne({ userId });
  if (includePin) {
    query.select('+pin');
  }

  const account = await query;
  if (!account) {
    throw notFound('Account not found');
  }
  if (account.status !== 'active') {
    throw new HttpError(403, 'Account is not active');
  }

  return account;
}

export async function deposit(req, res, next) {
  try {
    const account = await getCustomerAccount(req.user._id);
    account.balance += req.body.amount;
    await account.save();

    const transaction = await Transaction.create({
      accountId: account._id,
      type: 'deposit',
      amount: req.body.amount,
      description: 'Customer deposit'
    });

    await writeAudit({ userId: req.user._id, action: 'Deposit', ipAddress: req.ip });
    res.status(201).json({ account, transaction });
  } catch (error) {
    next(error);
  }
}

export async function withdraw(req, res, next) {
  try {
    const account = await getCustomerAccount(req.user._id, true);
    if (!(await account.comparePin(req.body.pin))) {
      throw new HttpError(401, 'Invalid transaction PIN');
    }
    if (account.balance < req.body.amount) {
      throw new HttpError(400, 'Insufficient balance');
    }

    account.balance -= req.body.amount;
    await account.save();

    const transaction = await Transaction.create({
      accountId: account._id,
      type: 'withdrawal',
      amount: req.body.amount,
      description: 'Customer withdrawal'
    });

    await writeAudit({ userId: req.user._id, action: 'Withdrawal', ipAddress: req.ip });
    res.status(201).json({ account, transaction });
  } catch (error) {
    next(error);
  }
}

export async function transfer(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await Account.findOne({ userId: req.user._id }).select('+pin').session(session);
    const receiver = await Account.findOne({ accountNumber: req.body.receiverAccount }).session(session);

    if (!sender) {
      throw notFound('Sender account not found');
    }
    if (!receiver) {
      throw notFound('Receiver account not found');
    }
    if (sender._id.equals(receiver._id)) {
      throw new HttpError(400, 'Sender and receiver accounts must differ');
    }
    if (sender.status !== 'active' || receiver.status !== 'active') {
      throw new HttpError(403, 'Both accounts must be active');
    }
    if (!(await sender.comparePin(req.body.pin))) {
      throw new HttpError(401, 'Invalid transaction PIN');
    }
    if (sender.balance < req.body.amount) {
      throw new HttpError(400, 'Insufficient balance');
    }

    sender.balance -= req.body.amount;
    receiver.balance += req.body.amount;
    await sender.save({ session });
    await receiver.save({ session });

    const [transferRecord] = await Transfer.create(
      [{ senderAccount: sender._id, receiverAccount: receiver._id, amount: req.body.amount }],
      { session }
    );

    await Transaction.create(
      [
        {
          accountId: sender._id,
          type: 'transfer_out',
          amount: req.body.amount,
          description: `Transfer to ${receiver.accountNumber}`
        },
        {
          accountId: receiver._id,
          type: 'transfer_in',
          amount: req.body.amount,
          description: `Transfer from ${sender.accountNumber}`
        }
      ],
      { session }
    );

    await session.commitTransaction();
    await writeAudit({ userId: req.user._id, action: 'Transfer', ipAddress: req.ip });
    res.status(201).json({ transfer: transferRecord, account: sender });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
}

export async function history(req, res, next) {
  try {
    const account = await Account.findOne({ userId: req.user._id });
    if (!account && req.user.role === 'customer') {
      throw notFound('Account not found');
    }

    const filter = req.user.role === 'customer' ? { accountId: account._id } : {};
    const transactions = await Transaction.find(filter).sort({ createdAt: -1 }).limit(100);
    res.json({ transactions });
  } catch (error) {
    next(error);
  }
}
