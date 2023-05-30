import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
import "./js/db";

import adminRouter from "./routes/admin";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "/admin", "/build")));

app.use("/uploads", express.static(path.join(__dirname, "..", "./uploads")));
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({ test: "hi" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
