import isEmpty from 'is-empty';
import validator from 'validator';

const loginValidation = (data) => {
  const errors = [];
  let { email, password } = data;

  // Convert empty fields to an empty string, so we can use validator functions
  email = isEmpty(email) ? '' : email;
  password = isEmpty(password) ? '' : password;

  //Email Validation
  if (validator.isEmpty(email)) {
    errors.push('Email field is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Email is invalid');
  }

  //Password Validation
  if (validator.isEmpty(password)) {
    errors.push('Password field is required');
  }

  return {
    errors,
    hasErrors: errors.length > 0,
  };
};

const registerValidation = (data) => {
  const errors = [];
  let {
    RFC,
    CURP,
    type,
    firstName,
    phoneNo,
    email,
    lastName,
    passport,
    password,
    fatherName,
    motherName,
    bankAccount,
    hasFundsLegalSource,
    fundsLegalSource,
    passportExpireDate,
  } = data;

  // Convert empty fields to an empty string, so we can use validator functions
  RFC = isEmpty(RFC) ? '' : RFC;
  CURP = isEmpty(CURP) ? '' : CURP;
  type = isEmpty(type) ? '' : type;
  firstName = isEmpty(firstName) ? '' : firstName;

  email = isEmpty(email) ? '' : email;
  phoneNo = isEmpty(phoneNo) ? '' : phoneNo;
  lastName = isEmpty(lastName) ? '' : lastName;
  passport = isEmpty(passport) ? '' : passport;
  password = isEmpty(password) ? '' : password;
  fatherName = isEmpty(fatherName) ? '' : fatherName;
  motherName = isEmpty(motherName) ? '' : motherName;
  bankAccount = isEmpty(bankAccount) ? '' : bankAccount;
  fundsLegalSource = isEmpty(fundsLegalSource) ? '' : fundsLegalSource;
  hasFundsLegalSource = isEmpty(hasFundsLegalSource) ? '' : hasFundsLegalSource;

  passportExpireDate = isEmpty(passportExpireDate) ? '' : passportExpireDate;

  //RFC Validation
  if (validator.isEmpty(RFC)) errors.push('RFC field is required');

  //CURP Validation
  if (validator.isEmpty(CURP)) errors.push('CURP field is required');

  //Type Validation
  if (validator.isEmpty(type)) errors.push('type field is required');

  //Name Validation
  if (validator.isEmpty(firstName)) errors.push('name field is required');

  //email Validation
  if (validator.isEmpty(email)) errors.push('name field is required');
  else if (!validator.isEmail(email)) {
    errors.push('Email is invalid');
  }

  // phone Validation
  if (validator.isEmpty(phoneNo)) errors.push('phone field is required');

  //Last Name Validation
  if (validator.isEmpty(lastName)) errors.push('last name field is required');

  //Passport Validation
  if (validator.isEmpty(passport)) errors.push('passport field is required');

  //Password Validation
  //   if (validator.isEmpty(password)) errors.push('password field is required');
  //   else if (validator.isStrongPassword(password)) {
  //     errors.push(
  //       'password length must be 8, 1 lowercase alphabet, 1 uppercase alphabet, 1 minimum number and 1 special character'
  //     );
  //   }

  if (validator.isEmpty(fatherName))
    errors.push('Father Name field is required');

  if (validator.isEmpty(motherName))
    errors.push('Mother Name field is required');

  if (validator.isEmpty(bankAccount))
    errors.push('Bank Account field is required');

  //   if (validator.isEmpty(fundsLegalSource))
  //     errors.push('Fund Legal Source field is required');

  if (validator.isEmpty(passportExpireDate))
    errors.push('passport expire date Source field is required');
  else if (!validator.toDate(passportExpireDate)) {
    errors.push('invalid passport expiry date');
  }
  return {
    errors,
    hasErrors: errors.length > 0,
  };
};

export { loginValidation, registerValidation };
