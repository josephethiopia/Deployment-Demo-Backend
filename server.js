import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/auth", authRoutes);

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://GDSC:GDSC@gdsc.qnc2c.mongodb.net/?retryWrites=true&w=majority&appName=GDSC"
    );
    console.log("Connected to MongoDB");
    await app.listen(8745, () => {
      console.log("Listening on Port 5000");
    });
  } catch (e) {
    console.log(e.message);
  }
})();
