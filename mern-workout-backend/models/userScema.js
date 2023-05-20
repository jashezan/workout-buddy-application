const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating static methods for signup
userSchema.statics.signup = async function (email, password) {
  if(!email || !password) {
    throw Error("email and password are required");
  }
  if(!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  // if(!validator.isStrongPassword(password)) {
  //   throw Error("password is not strong enough");
  // }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

// creating static methods for login
userSchema.statics.login = async function (email, password) {
  if(!email || !password) {
    throw Error("email and password are required");
  }
  if(!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw Error("Incorrect password");
  }
  return user;
}

module.exports = mongoose.model("User", userSchema);
