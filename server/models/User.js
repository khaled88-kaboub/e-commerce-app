const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique"],
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

const bcrypt = require("bcryptjs");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    console.log("Addding salt");
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function (pwd) {
  return await bcrypt.compare(pwd, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
