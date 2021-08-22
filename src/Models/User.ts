import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Loaders/Database";

export class User extends Model {}

User.init(
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: { type: DataTypes.INTEGER, allowNull: false },
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
  { sequelize, modelName: "user", timestamps: false }
);
