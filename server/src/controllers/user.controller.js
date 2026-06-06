import { Account } from '../models/Account.js';
import { User } from '../models/User.js';
import { generateAccountNumber } from '../utils/accountNumber.js';
import { notFound } from '../utils/httpError.js';

export async function listUsers(_req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    if (req.body.role === 'customer' && !req.body.pin) {
      return res.status(400).json({ message: 'PIN is required for customer accounts' });
    }

    const user = await User.create(req.body);

    if (user.role === 'customer') {
      await Account.create({
        userId: user._id,
        accountNumber: generateAccountNumber(),
        pin: req.body.pin
      });
    }

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      throw notFound('User not found');
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw notFound('User not found');
    }
    await Account.deleteOne({ userId: user._id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
