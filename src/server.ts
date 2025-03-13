import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./shared/infra/database/data-source";
import router from "./shared/infra/http/routes/routes";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
  });
});
