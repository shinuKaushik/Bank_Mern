import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema(
  {
    senderAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    receiverAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['completed', 'failed'], default: 'completed' }
  },
  { timestamps: true }
);

export const Transfer = mongoose.model('Transfer', transferSchema);
