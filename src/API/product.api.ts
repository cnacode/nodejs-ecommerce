import type { Request, RequestHandler, Response, Express } from "express";
import { createProduct, listProducts } from "../Services/product.service";

type APIDependencies = {
  expressInstance: Express;
};

export default function loadProductAPI({
  expressInstance,
}: APIDependencies): void {
  expressInstance.get("/product", async (req: Request, res: Response) => {
    try {
      res.json(await listProducts());
    } catch (e) {
      console.log("error in /product GET", e);
      res.status(500).send();
    }
  });

  expressInstance.post(
    "/product",
    createProductValidator,
    async (req: Request, res: Response) => {
      console.log(req.body);
      try {
        res.json(await createProduct(req.body));
      } catch (e) {
        console.log("error in /product POST", e);
        res.status(500).send();
      }
    }
  );
}

const createProductValidator: RequestHandler = (req, res, next) => {
  console.log(req.body);
  if (!req.body) return res.status(400).send();
  if (
    !req.body.name ||
    !req.body.merchant_id ||
    !req.body.price ||
    !req.body.status
  )
    return res.status(400).send();

  return next();
};
