import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseURL = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Middleware
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connexion à MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(databaseURL);
    console.log("DB Connection Successful.");
    return connection;
  } catch (error) {
    console.error("DB Connection Failed: ", error);
    process.exit(1);
  }
}

const server = app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectToDatabase();
});
