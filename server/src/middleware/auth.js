import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { HttpError } from '../utils/httpError.js';

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new HttpError(401, 'Authentication token required');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'development-secret');
    const user = await User.findById(payload.sub).select('-password');

    if (!user) {
      throw new HttpError(401, 'Invalid authentication token');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new HttpError(401, 'Invalid authentication token'));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new HttpError(403, 'Insufficient role permissions'));
    }

    next();
  };
}
