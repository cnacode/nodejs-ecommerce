import { sequelize } from "../Loaders/Database";
import { Order } from "../Models/Order";
import { OrderItem } from "../Models/OrderItem";
import { Product } from "../Models/Product";

type GetOrderArgs = {
  id: number;
};

export async function getOrderProductsList({
  id,
}: GetOrderArgs): Promise<Product[] | null> {
  const [list] = (await sequelize.query(
    `SELECT products.* FROM orders
  INNER JOIN order_items on order_items.order_id = orders.id
  INNER JOIN products on products.id = order_items.product_id 
  WHERE orders.id=${id}`
  )) as [Product[] | null, any];

  return list;
}

type CreateOrderArgs = {
  userId: number;
  items: {
    productId: number;
  }[];
};

export async function createOrder({
  userId,
  items,
}: CreateOrderArgs): Promise<{ order: Order; orderItems: OrderItem[] }> {
  const order: any = await Order.create({
    user_id: userId,
    status: "NEW",
  });

  const orderItems = await OrderItem.bulkCreate(
    items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
    }))
  );

  return { order, orderItems };
}

type AddItemToOrderArgs = {
  orderId: number;
  productId: number;
};

export async function addItemToOrder({
  orderId,
  productId,
}: AddItemToOrderArgs): Promise<{ order: Order; orderItem: OrderItem }> {
  const order: any = await Order.findByPk(orderId);

  if (!order || order.deletedAt) throw new Error("ORDER_NOT_FOUND");

  const orderItem = await OrderItem.create({
    order_id: orderId,
    product_id: productId,
  });

  return { order, orderItem };
}
