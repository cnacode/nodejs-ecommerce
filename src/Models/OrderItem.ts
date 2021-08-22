import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Loaders/Database";
import { Order } from "./Order";
import { Product } from "./Product";

export class OrderItem extends Model {}

OrderItem.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: "order_item", timestamps: false }
);
