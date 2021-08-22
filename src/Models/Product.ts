import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Loaders/Database";

export enum PRODUCT_STATUS {
  IN_STOCK = "IN_STOCK",
  SOLD_OUT = "SOLD_OUT",
  COMING_SOON = "COMING_SOON",
}

export class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM({
        values: ["IN_STOCK", "SOLD_OUT", "COMING_SOON"],
      }),
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
  {
    sequelize,
    modelName: "product",
    timestamps: false,
  }
);
