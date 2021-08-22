import { Product } from "./Product";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import { Order } from "./Order";

export default function setupModels(): void {
  User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
  });

  Order.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "user",
  });

  Order.hasMany(OrderItem, {
    foreignKey: "order_id",
    as: "items",
  });

  OrderItem.belongsTo(Order, {
    foreignKey: "order_id",
    targetKey: "id",
    as: "order",
  });

  Product.belongsTo(OrderItem, {
    foreignKey: "id",
  });
}
