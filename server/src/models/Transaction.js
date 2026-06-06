import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'transfer_in', 'transfer_out'], required: true },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
