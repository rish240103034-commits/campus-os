import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({
    service: "auth-service",
    status: "healthy"
  });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Auth Service running on ${PORT}`);
});
