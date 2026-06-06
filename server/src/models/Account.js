import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    accountNumber: { type: String, required: true, unique: true, index: true },
    balance: { type: Number, default: 0, min: 0 },
    pin: { type: String, required: true, select: false },
    status: { type: String, enum: ['active', 'frozen'], default: 'active' }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.pin;
        return ret;
      }
    }
  }
);

accountSchema.pre('save', async function hashPin(next) {
  if (!this.isModified('pin')) {
    return next();
  }

  this.pin = await bcrypt.hash(this.pin, 10);
  next();
});

accountSchema.methods.comparePin = function comparePin(candidate) {
  return bcrypt.compare(candidate, this.pin);
};

export const Account = mongoose.model('Account', accountSchema);
