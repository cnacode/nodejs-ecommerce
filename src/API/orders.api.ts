import type { Request, RequestHandler, Response, Express } from "express";
import {
  addItemToOrder,
  createOrder,
  getOrderProductsList,
} from "../Services/order.service";

type APIDependencies = {
  expressInstance: Express;
};

type CreateOrderItem = {
  productId: number;
};

const getOrderValidator: RequestHandler = (req, res, next) => {
  if (!req.params?.id || isNaN(Number(req.params?.id)))
    return res.status(400).send();
  next();
};

export default function loadOrderAPI({
  expressInstance,
}: APIDependencies): void {
  expressInstance.get(
    "/order/products/:id",
    getOrderValidator,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        res.json(await getOrderProductsList({ id: Number(id) }));
      } catch (e) {
        console.log("error in /product GET", e);
        res.status(500).send();
      }
    }
  );

  const createOrderValidator: RequestHandler = (req, res, next) => {
    if (!req.body) return res.status(400).send();

    if (!req.body.userId || !req.body.items || !req.body.items.length)
      return res.status(400).send();

    if (
      !req.body.items.every((item: CreateOrderItem) => {
        return item.productId && !isNaN(item.productId);
      })
    )
      return res.status(400).send();

    next();
  };

  expressInstance.post(
    "/order",
    createOrderValidator,
    async (req: Request, res: Response) => {
      const { userId, items } = req.body;
      try {
        res.json(await createOrder({ userId, items }));
      } catch (e) {
        console.log("error in /product POST", e);
        res.status(500).send();
      }
    }
  );

  const addItemToOrderValidator: RequestHandler = (req, res, next) => {
    if (!req.body || !req.params?.id || isNaN(Number(req.params?.id)))
      return res.status(400).send();

    if (!req.body.productId) return res.status(400).send();

    next();
  };

  expressInstance.patch(
    "/order/:id",
    addItemToOrderValidator,
    async (req: Request, res: Response) => {
      const { productId } = req.body;
      const { id } = req.params;
      try {
        res.json(await addItemToOrder({ orderId: Number(id), productId }));
      } catch (e) {
        console.log("error in /product PATCH", e);
        if (e.message === "ORDER_NOT_FOUND") return res.status(404).send();
        res.status(500).send();
      }
    }
  );
}
