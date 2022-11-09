import mongoose from 'mongoose';

const walletBankSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['owner', 'ownerSon', 'investor'],
    required: true,
  },
  shareValue: {
    type: Number,
    required: true,
  },
  shareAmount: {
    type: Number,
    required: true,
  },
  totalValueShare: {
    type: Number,
    required: true,
  },
  project: {
    type: Number,
    required: true,
  },
  dividendTotal: {
    type: Number,
    required: true,
  },
});

const Wallet = mongoose.model('WalletBank', walletBankSchema);

export default Wallet;
