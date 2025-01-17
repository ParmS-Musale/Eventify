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

module.exports = { validateSignupData };
