import { Account } from '../models/Account.js';
import { HttpError, notFound } from '../utils/httpError.js';
import { writeAudit } from '../services/audit.service.js';

export async function listAccounts(req, res, next) {
  try {
    const filter = req.user.role === 'customer' ? { userId: req.user._id } : {};
    const accounts = await Account.find(filter).populate('userId', 'name email role');
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
}

export async function getAccount(req, res, next) {
  try {
    const account = await Account.findById(req.params.id).populate('userId', 'name email role');
    if (!account) {
      throw notFound('Account not found');
    }

    if (req.user.role === 'customer' && account.userId._id.toString() !== req.user._id.toString()) {
      throw new HttpError(403, 'Cannot access another customer account');
    }

    res.json({ account });
  } catch (error) {
    next(error);
  }
}

export async function freezeAccount(req, res, next) {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, { status: 'frozen' }, { new: true });
    if (!account) {
      throw notFound('Account not found');
    }

    await writeAudit({ userId: req.user._id, action: 'Account Freeze', ipAddress: req.ip });
    res.json({ account });
  } catch (error) {
    next(error);
  }
}

export async function activateAccount(req, res, next) {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true });
    if (!account) {
      throw notFound('Account not found');
    }

    await writeAudit({ userId: req.user._id, action: 'Account Activate', ipAddress: req.ip });
    res.json({ account });
  } catch (error) {
    next(error);
  }
}
