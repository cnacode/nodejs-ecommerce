import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import type { Express } from "express";
import bodyParser from "body-parser";

import setupAPI from "./API/routes";
import setupModels from "./Models";
import setupCrones from "./Loaders/Crons";

export const expressInstance: Express = express();
expressInstance.use(bodyParser.json());
const PORT = process.env.PORT;

(() => {
  setupModels();

  setupAPI();

  expressInstance.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  setupCrones();
})();
