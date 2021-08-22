import type { Request, Response } from "express";
import { version } from "../../package.json";
import setupCrones from "../Loaders/Crons";
import { expressInstance } from "../server";
import loadOrderAPI from "./orders.api";
import loadProductAPI from "./product.api";

export default function setupAPI(): void {
  expressInstance.get("/meta", (req: Request, res: Response) => {
    res.json({ version });
  });

  loadProductAPI({ expressInstance });
  loadOrderAPI({ expressInstance });
}
