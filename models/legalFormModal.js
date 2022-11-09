import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const legalModal = new Schema(
  {
    articlesIncorporation: {
      type: String,
      required: true,
    },
    taxID: {
      type: String,
      required: true,
    },
    taxDomicile: {
      type: String,
      required: true,
    },
    powerOfAttorney: {
      type: String,
      required: true,
    },

    shareHolder: {
      type: String,
      required: true,
    },
    electronicSignature: {
      type: String,
      required: true,
    },
    hasFundsLegalSource: {
      type: Boolean,
      required: true,
    },
    fundsLegalSource: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const LegalForm = mongoose.model('LegalForm', legalModal);

export default LegalForm;
