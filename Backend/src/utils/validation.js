const validator = require("validator");

// Validation For Signup Data

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    return "First Name and Last Name are required";
  }

  if (!emailId || !validator.isEmail(emailId)) {
    return "Enter a valid Email Address";
  }

  if (!password || !validator.isStrongPassword(password)) {
    return "Enter a Strong Password";
  }
  return { success: true };
};

const vaildateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "password",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed; // true or false
};

module.exports = { validateSignupData , vaildateEditProfileData};
