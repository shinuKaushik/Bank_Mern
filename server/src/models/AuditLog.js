import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    ipAddress: { type: String, default: '' }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
