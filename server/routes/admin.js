import express from "express";
import multer from "multer";
import moment from "moment";
import User from "../models/User";
import {
  Logos,
  Notification,
  NewFamily,
  OffLineWorship,
} from "../Models/Models";
import { auth } from "../middleware/auth";

const adminRouter = express.Router();

const notificationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/admin/notification/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const worshipStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/admin/worship/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const newFamilyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/admin/newFamily/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const notificationUpload = multer({ storage: notificationStorage }).single(
  "file"
);

const newFamilyUpload = multer({ storage: newFamilyStorage }).single("file");
const worshipUpload = multer({ storage: worshipStorage }).single("file");

adminRouter.get("/auth", auth, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    isAuth: true,
    account: req.user.account,
    name: req.user.name,
  });
});

adminRouter.post("/login", async (req, res) => {
  const {
    body: { account, password },
  } = req;
  let user = await User.findOne({ account });

  if (!user) {
    return res.json({
      loginSuccess: false,
      message: "가입 된 아이디가 없습니다.",
    });
  }

  if (user.role === 0) {
    return res.json({
      loginSuccess: false,
      message: "관리자 계정이 아닙니다.",
    });
  }

  let userPasswordCompare = await user.comparePassword(password);

  if (!userPasswordCompare) {
    return res.json({
      loginSuccess: false,
      message: "비밀번호가 맞지 않습니다.",
    });
  }
  const userGenerateToken = await user.generateToken();
  if (!userGenerateToken.token) {
    return res.json({
      loginSuccess: false,
      message: "로그인 실패.",
    });
  }
  return res.cookie("w_auth", user.token).status(200).json({
    loginSuccess: true,
    userId: user._id,
    userName: user.name,
  });
});

adminRouter.post("/register", async (req, res) => {
  const {
    body: {
      name,
      account,
      password,
      checkPassword,
      position,
      phoneNumber,
      authNumber,
    },
  } = req;

  if (process.env.AUTH_NUMBER !== authNumber) {
    return res.json({ success: false, err: "인증코드가 맞지 않습니다." });
  }

  let userFind = await User.findOne({ account: account });
  if (userFind) {
    return res.json({ success: false, err: "동일한 아이디가 존재합니다." });
  }
  if (password != checkPassword) {
    return res.json({ success: false, err: "패스워드가 일치하지 않습니다." });
  }
  let user = await User.create({
    account,
    password: password.toLowerCase(),
    name,
    position,
    role: 1,
    phoneNumber,
  });
  return res.status(200).json({ success: true });
});

adminRouter.get("/logout", auth, async (req, res) => {
  let logoutUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    { new: true }
  );
  if (!logoutUser) return res.json({ success: false, err });
  return res.json({ success: true });
});

adminRouter.get("/proclamation", async (req, res) => {
  const logos = await Logos.findOne();
  return res.json({ success: true, logos });
});

adminRouter.post("/proclamation-update", async (req, res) => {
  const {
    body: { message, paragraph },
  } = req;
  const logos = await Logos.findOne();
  logos.paragraph = paragraph;
  logos.todayLogos = message;
  logos.logosList.push({ paragraph, message });
  await logos.save();

  return res.json({ success: true, logos });
});

adminRouter.post("/notification/image-save", (req, res) => {
  notificationUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    const filePath = res.req.file.path;
    return res.json({ success: true, filePath });
  });
});

adminRouter.post("/notification/get-notification", async (req, res) => {
  const {
    body: { id },
  } = req;
  const notification = await Notification.findById(id);
  return res.json({ success: true, notification });
});

adminRouter.post("/notification/edit-notification", async (req, res) => {
  const {
    body: { id, title, contents, imagePath },
  } = req;
  let notification = await Notification.findOneAndUpdate(
    { _id: id },
    { title, contents, imagePath },
    { new: true }
  );
  return res.json({ success: true, notification });
});

adminRouter.get("/notification/get-notifications", async (req, res) => {
  const notification = await Notification.find();
  return res.json({ success: true, notification });
});

adminRouter.post("/notification/upload-notification", async (req, res) => {
  const {
    body: { title, contents, imagePath },
  } = req;
  const notification = await Notification.create({
    title,
    contents,
    imagePath,
  });
  return res.json({ success: true, notification });
});

adminRouter.post("/new-family/image-save", (req, res) => {
  newFamilyUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false });
    }
    const imagePath = res.req.file.path;
    return res.json({ success: true, imagePath });
  });
});

adminRouter.post("/new-family", async (req, res) => {
  const {
    body: { limit, skip },
  } = req;
  try {
    const newFamily = await NewFamily.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    if (newFamily.length < limit) {
      return res.json({
        success: true,
        newFamily,
        isScroll: false,
      });
    }
    return res.json({
      success: true,
      newFamily,
      isScroll: true,
    });
  } catch (err) {
    return res.json({
      success: false,
    });
  }
});

adminRouter.post("/new-family/edit-new-family", async (req, res) => {
  const {
    body: { id, name, invitationPerson, date, imagePath },
  } = req;
  const newFamily = await NewFamily.findOneAndUpdate(
    { _id: id },
    { name, invitationPerson, date, imagePath },
    { new: true }
  );
  return res.json({ success: true, newFamily });
});

adminRouter.post("/new-family/upload-new-family", async (req, res) => {
  const {
    body: { name, invitationPerson, imagePath, date },
  } = req;
  console.log(name, invitationPerson, imagePath, date);
  const momentDate = moment(date).format("YYYY-MM-DD");

  const newFamily = await NewFamily.create({
    name,
    invitationPerson,
    imagePath,
    date: momentDate,
  });
  return res.json({ success: true, newFamily });
});

adminRouter.post("/worship/image-save", async (req, res) => {
  worshipUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false });
    }
    const imagePath = res.req.file.path;
    return res.json({ success: true, imagePath });
  });
});

adminRouter.post("/worship-management", async (req, res) => {
  try {
    const {
      body: { id },
    } = req;

    const offLineWorship = await OffLineWorship.findById(id);
    return res.json({ success: true, offLineWorship });
  } catch (err) {
    return res.json({ success: false });
  }
});
adminRouter.get("/worship-management", async (req, res) => {
  try {
    const offLineWorship = await OffLineWorship.find().sort({ _id: -1 });
    return res.json({ success: true, offLineWorship });
  } catch (err) {
    return res.json({ success: false });
  }
});
adminRouter.post("/worship-management/add", async (req, res) => {
  try {
    const {
      body: {
        title,
        speaker,
        date,
        time,
        openDate,
        openTime,
        imagePath,
        limit,
      },
    } = req;
    console.log(
      title,
      speaker,
      date,
      time,
      openDate,
      openTime,
      imagePath,
      limit
    );
    const offLineWorship = await OffLineWorship.create({
      title,
      speaker,
      date,
      time,
      openDate,
      openTime,
      imagePath,
      limit,
    });
    console.log(offLineWorship);
    return res.json({ success: true, offLineWorship });
  } catch (err) {
    return res.json({ success: false });
  }
});

adminRouter.post("/worship-management/edit", async (req, res) => {
  try {
    const {
      body: {
        id,
        title,
        speaker,
        date,
        time,
        openDate,
        openTime,
        imagePath,
        limit,
      },
    } = req;
    const offLineWorship = await OffLineWorship.findOneAndUpdate(
      { _id: id },
      {
        title,
        speaker,
        date,
        time,
        openDate,
        openTime,
        imagePath,
        limit,
      },
      { new: true }
    );
    return res.json({ success: true, offLineWorship });
  } catch (err) {
    return res.json({ success: false });
  }
});

adminRouter.post("/worship-apply", async (req, res) => {
  try {
    const {
      body: { id, userId },
    } = req;
    const offLineWorship = await OffLineWorship.findById(id);
    const personLength = offLineWorship.parti.length;
    if (offLineWorship.limit <= personLength) {
      throw new Error("신청 인원이 초과되었습니다.");
    }
    const user = await User.findById(userId);
    const addWorship = await offLineWorship.addParti(user._id);
    if (addWorship) {
      await user.addWorship(offLineWorship);
    }
    return res.json({ success: true, offLineWorship });
  } catch (err) {
    const message = err.message;
    return res.json({ success: false, message });
  }
});

adminRouter.post("/worship-result/cancel", async (req, res) => {
  try {
    const {
      body: { id, userId },
    } = req;
    const offLineWorship = await OffLineWorship.findById(id);
    const user = await User.findById(userId);
    const subtractWorship = await offLineWorship.subtract(user._id);

    if (subtractWorship) {
      await user.subtractWorship(offLineWorship._id);
    }
    const userWorship = user.worship;
    return res.json({ success: true, userWorship });
  } catch (err) {
    const message = "죄송합니다 일시적인 오류가 발생했습니다.";
    return res.json({ success: false, message });
  }
});

export default adminRouter;
