import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['investor', 'legalEntity', 'JTC_Employee'],
      required: true,
    },

    Name: {
      type: String,
      required: false,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter a valid email address',
      ],
    },
    passport: {
      type: String,
      required: true,
    },
    passportExpireDate: {
      type: Date,
      require: true,
    },
    bankAccount: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    fundsLegalSource: {
      type: String,
      require: true,
    },
    RFC: {
      type: String,
      require: true,
    },
    CURP: {
      type: String,
      require: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const User = mongoose.model('User', userSchema);
export default User;
