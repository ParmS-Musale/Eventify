const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
    age: {
      type: Number,
      min: 0, // Age cannot be negative
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be strong (at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 symbol)."
          );
        }
      },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    photoUrl: {
      type: String,
      default: "https://example.com/default-image.png", // Replace with an actual default image URL
    },
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Generate JWT
userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// Validate Password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  return bcrypt.compare(passwordInputByUser, user.password);
};

module.exports = mongoose.model("User", userSchema);
