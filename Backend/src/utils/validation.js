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

// Validate Profile Data
const vaildateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "password",
    "photoUrl",
    // "dob", 
    // "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed; // true or false
};

// Validation function for event data
const validateEventData = (data) => {
  const { name, description, date, location, capacity ,category } = data;

  if (!name || !description || !date || !location || !capacity || !category) {
    return "All fields are required.";
  }

  if (typeof capacity !== "number" || capacity <= 0) {
    return "Capacity should be a positive number.";
  }

  return true; // Validation passes
};

module.exports = {
  validateSignupData,
  vaildateEditProfileData,
  validateEventData,
};
