import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./shared/infra/database/data-source";
import router from "./shared/infra/http/routes/routes";

import dotenv from "dotenv";
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
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
