import { AuditLog } from '../models/AuditLog.js';

export async function writeAudit({ userId, action, ipAddress }) {
  await AuditLog.create({ userId, action, ipAddress });
}
