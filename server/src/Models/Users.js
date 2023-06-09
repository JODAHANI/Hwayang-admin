import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  position: {
    type: Object,
  },
  phoneNumber: {
    type: Number,
  },
  letters: {
    type: [Object],
    default: [],
  },
  prays: {
    type: [Object],
    default: [],
  },
  graceSharing: {
    type: [Object],
    default: [],
  },
  worship: {
    type: [Object],
    default: [],
  },
  role: {
    type: Number,
    default: 1,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    let user = this;
    let saltRounds = parseInt(process.env.SALT_ROUNDS);
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password) {
  let result = bcrypt.compare(password, this.password).then((result) => {
    return result;
  });
  return result;
};

userSchema.methods.generateToken = async function () {
  let user = this;
  let token = jwt.sign(user._id.toJSON(), process.env.HASH);
  user.token = token;
  await user.save();
  return user;
};

userSchema.statics.analyzer = function (token, cb) {
  var user = this;
  jwt.verify(token, process.env.HASH, function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.addWorship = async function (worship) {
  var user = this;
  try {
    await user.worship.unshift(worship);
    await user.save();
    return true;
  } catch (err) {
    return false;
  }
};

userSchema.methods.subtractWorship = async function (worship) {
  var user = this;
  try {
    const userWorship = user.worship;
    const fillterWorship = userWorship.filter((item) => {
      console.log(item._id.toString(), worship.toString());
      return item._id.toString() !== worship.toString();
    });
    user.worship = [...fillterWorship];
    user.save();
    return true;
  } catch (err) {
    return false;
  }
};

const Users = mongoose.model("User", userSchema);

export default Users;
