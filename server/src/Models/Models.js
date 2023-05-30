import mongoose from "mongoose";
require("dotenv").config();

const logosSchema = new mongoose.Schema({
  todayLogos: {
    type: String,
    default: undefined,
  },
  paragraph: {
    type: String,
    default: undefined,
  },
  logosList: {
    type: [Object],
    default: undefined,
  },
});

const worshipSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 1004,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
});

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
  },
  imagePath: {
    type: String,
  },
});

const newFamilySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  invitationPerson: {
    type: String,
  },
  imagePath: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const offLineWorshipSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  speaker: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  openDate: {
    required: true,
    type: String,
  },
  openTime: {
    required: true,
    type: String,
  },
  imagePath: {
    required: true,
    type: String,
  },
  limit: {
    required: true,
    type: Number,
  },
  parti: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

offLineWorshipSchema.methods.addParti = async function (user) {
  var worship = this;
  try {
    await worship.parti.unshift(user);
    await worship.save();
    return true;
  } catch (err) {
    return false;
  }
};

offLineWorshipSchema.methods.subtract = async function (user) {
  var worship = this;
  try {
    const parti = worship.parti;

    const fillterParti = parti.filter((person) => {
      return person.toString() !== user.toString();
    });
    worship.parti = [...fillterParti];
    worship.save();
    return true;
  } catch (err) {
    return false;
  }
};

export const Worship = mongoose.model("Worship", worshipSchema);
export const OffLineWorship = mongoose.model(
  "OffLineWorship",
  offLineWorshipSchema
);
export const Logos = mongoose.model("Logos", logosSchema);
export const Notification = mongoose.model("Notification", notificationSchema);
export const NewFamily = mongoose.model("NewFamily", newFamilySchema);
