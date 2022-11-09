import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import LegalForm from '../models/legalFormModal.js';

import generateToken from '../utils/generateToken.js';
import {
  loginValidation,
  registerValidation,
} from '../validation/usersValidation.js';

const legal_Form = asyncHandler(async (req, res) => {
  const {
    articlesIncorporation,
    taxID,
    taxDomicile,
    powerOfAttorney,
    shareHolder,
    electronicSignature,
    fundsLegalSource,
  } = req.files;

  console.log('testing');

  console.log(req.files);

  const articlesIncorporation_FILENAME = articlesIncorporation[0]['filename'];
  const taxID_FILENAME = taxID[0]['filename'];
  const taxDomicile_FILENAME = taxDomicile[0]['filename'];
  const powerOfAttorney_FILENAME = powerOfAttorney[0]['filename'];
  const shareHolder_FILENAME = shareHolder[0]['filename'];
  const electronicSignature_FILENAME = electronicSignature[0]['filename'];
  const fundsLegalSource_FILENAME = fundsLegalSource[0]['filename '];

  res.json(req.files);

  req.body.articlesIncorporation = articlesIncorporation_FILENAME;
  req.body.taxID = taxID_FILENAME;
  req.body.taxDomicile = taxDomicile_FILENAME;
  req.body.powerOfAttorney = powerOfAttorney_FILENAME;
  req.body.shareHolder = shareHolder_FILENAME;
  req.body.electronicSignature = electronicSignature_FILENAME;
  req.body.fundsLegalSource = fundsLegalSource_FILENAME;

  const legalUser = new LegalForm(req.body);
  await legalUser.save();
  res
    ?.status(201)
    .json({ status: true, massage: 'Files has been successfully uploaded' });
});

//@route    POST /api/users
//@access   Pubic
const registerUser = asyncHandler(async (req, res) => {
  const { RFC, CURP, fundsLegalSource } = req.files;

  res.send(req.files);

  const RFC_FILENAME = RFC[0]['filename'];
  const CURP_FILENAME = CURP[0]['filename'];
  const fundsLegalSource_FILENAME = fundsLegalSource[0]['filename'];

  req.body.RFC = RFC_FILENAME;
  req.body.CURP = CURP_FILENAME;
  req.body.fundsLegalSource = fundsLegalSource_FILENAME;

  const { errors, hasErrors } = registerValidation(req.body);

  //This Blocks runs if validation fails
  if (hasErrors) {
    res.status(400);
    throw new Error(errors);
  }

  const { email, password } = req.body;

  const user = await User.exists({ email });

  if (user) {
    res.status(409);
    throw new Error('This email address already in use');
  }

  const newUser = new User(req.body);
  const salt = bcrypt.genSaltSync(10);
  newUser.password = bcrypt.hashSync(password, salt);

  await newUser.save();

  res?.status(201).json({ status: true, massage: 'User has been created' });
});

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Pubic
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  const { errors, hasErrors } = loginValidation(req.body);

  //This Blocks runs if validation fails
  if (hasErrors) {
    res?.status(400);
    throw new Error(errors);
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('user does not exist');
  }

  const isMatched = bcrypt.compareSync(password, user.password);

  // this blocks runs of password does not match
  if (!isMatched) {
    res.status(401);
    throw new Error('incorrect password');
  }

  if (!user.isVerified) {
    return res.status(200).send({
      status: true,
      message: 'Your profile verification is in-process',
    });
  }

  const {
    _id,
    type,
    firstName,
    lastName,
    phoneNo,

    token,
  } = user;
  return res
    .cookie('access_token', token, { httpOnly: true, sameSite: true })
    .json({
      status: true,
      data: {
        id: _id,
        type,
        firstName,
        lastName,
        phoneNo,

        email,
        token,
      },
    });
});

//@desc     Get user profile
//@route    GET /api/users/profile/:id
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);

  /*blocks runs if params id is not valid */
  if (!isValidID) {
    res.status(422);
    throw new Error('invalid param id');
  }

  const user = await User.findById(id);
  const {
    CURP,
    RFC,
    fundsLegalSource,
    bankAccount,
    passportExpireDate,
    passport,
    email,
    motherName,
    fatherName,
    firstName,
    phoneNo,
    lastName,
    name,
    type,
  } = user;

  res.status(200).json({
    status: true,
    user: {
      bankAccount,
      CURP,
      email,
      fundsLegalSource,
      fatherName,
      firstName,
      lastName,
      motherName,
      name,
      passportExpireDate,
      phoneNo,
      passport,
      RFC,
      type,
    },
  });
});

//@desc     Update user profile
//@route    PUT /api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
      res.status(400).json('There are nothing to update');
    }
    User.findByIdAndUpdate(id, { firstName, lastName }, (err, user) => {
      if (err) {
        res.status(409).json({ status: false, massage: err.message });
      } else {
        res
          .status(200)
          .json({ status: true, massage: 'User Profile has been update' });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      error: err,
      massage: 'server facing some unknown error',
    });
  }
});

//@desc     Get all users
//@route    GET /api/users
//@access   Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ status: true, users: users });
});

//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.Types.ObjectId.isValid(id);

  /*blocks runs if params id is not valid */
  if (!isValidID) {
    res.status(422);
    throw new Error('invalid param id');
  }

  const record = await User.deleteOne({ _id: id });
  if (record && record.deletedCount > 0)
    res.status(200).json({ status: true, massage: 'User has been deleted' });
  else {
    res.status(404).json({ status: true, massage: 'user does not exist' });
  }
});

//@desc     wallet Create
//@route    post /api/users/wallet/:id
//@access   Private

export {
  legal_Form,
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
