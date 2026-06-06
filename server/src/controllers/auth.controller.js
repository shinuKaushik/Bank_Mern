import { Account } from '../models/Account.js';
import { User } from '../models/User.js';
import { generateAccountNumber } from '../utils/accountNumber.js';
import { HttpError } from '../utils/httpError.js';
import { signToken } from '../utils/tokens.js';
import { writeAudit } from '../services/audit.service.js';

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function register(req, res, next) {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      throw new HttpError(409, 'Email is already registered');
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'customer'
    });

    const account = await Account.create({
      userId: user._id,
      accountNumber: generateAccountNumber(),
      pin: req.body.pin
    });

    await writeAudit({ userId: user._id, action: 'Register', ipAddress: req.ip });

    res.status(201).json({
      token: signToken(user),
      user: publicUser(user),
      account: {
        id: account._id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        status: account.status
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) {
      await writeAudit({ action: 'Failed Login', ipAddress: req.ip });
      throw new HttpError(401, 'Invalid email or password');
    }

    await writeAudit({ userId: user._id, action: 'Login', ipAddress: req.ip });

    res.json({
      token: signToken(user),
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

export async function profile(req, res, next) {
  try {
    const account = await Account.findOne({ userId: req.user._id });
    res.json({ user: publicUser(req.user), account });
  } catch (error) {
    next(error);
  }
}
