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
app.use(
  cors({
    credentials: true,
    origin: "https://hwayang-client-git-master-jodahani.vercel.app/",
  })
);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
