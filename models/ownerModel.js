import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ownerSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, 'please provide firts name '],
    },
    lastName: {
      type: String,
      require: [true, 'please provide your LastName'],
    },
    type: {
      type: String,
      enum: ['owner', 'ownerSon'],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
const ownerModel = mongoose.model('ownerModel', ownerSchema);

export default ownerModel;
