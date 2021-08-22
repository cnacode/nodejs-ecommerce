import { Product, PRODUCT_STATUS } from "../Models/Product";
import { sequelize } from "../Loaders/Database";

export async function listProducts(): Promise<Product[]> {
  return await Product.findAll();
}

type CreateProductArgs = {
  name: string;
  price: number;
  merchant_id: number;
  status: PRODUCT_STATUS;
};

export async function createProduct({
  name,
  status,
  price,
  merchant_id,
}: CreateProductArgs): Promise<Product> {
  return await Product.create({
    name,
    status,
    price,
    merchant_id,
  });
}

type WeeklyStatsType = {
  id: number;
  name: string;
  qtt_sold: number;
}[];

export async function getWeeklySellCount(): Promise<
  WeeklyStatsType | undefined
> {
  try {
    const [data] = (await sequelize.query(`
  SELECT products.id, products.name, COUNT(*) as "quantity_sold"
  FROM products
  left JOIN order_items on order_items.product_id = products.id
  GROUP BY products.id
 
`)) as [WeeklyStatsType, any];

    return data;
  } catch (e) {
    console.log("error in getWeeklySellCount", e);
  }
}
