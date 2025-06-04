import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/db.js";

import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
