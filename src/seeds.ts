import { Product, PRODUCT_STATUS } from "./Models/Product";
import { User } from "./Models/User";
import { OrderItem } from "./Models/OrderItem";
import { Order } from "./Models/Order";
import setupModels from "./Models";

(async () => {
  setupModels();

  await OrderItem.sync({ force: true });
  await Order.sync({ force: true });
  await User.sync({ force: true });
  await Product.sync({ force: true });

  const users = [
    {
      full_name: "Sina Montazeri",
      country_code: 98,
      created_at: Date.now(),
    },
    {
      full_name: "Mortimer Smith",
      country_code: 98,
      created_at: Date.now(),
    },
    {
      full_name: "Homer Simpson",
      country_code: 98,
      created_at: Date.now(),
    },
    {
      full_name: "Rick Sanchez",
      country_code: 98,
      created_at: Date.now(),
    },
  ];

  const products = [
    {
      merchant_id: 1,
      price: 1000,
      status: PRODUCT_STATUS.IN_STOCK,
      name: "iphone 12",
      created_at: Date.now(),
    },
    {
      merchant_id: 1,
      price: 1000,
      status: PRODUCT_STATUS.IN_STOCK,
      name: "iphone 11",
      created_at: Date.now(),
    },
    {
      merchant_id: 1,
      price: 1000,
      status: PRODUCT_STATUS.IN_STOCK,
      name: "iphone 10",
      created_at: Date.now(),
    },
    {
      merchant_id: 1,
      price: 799,
      status: PRODUCT_STATUS.IN_STOCK,
      name: "iphone 8",
      created_at: Date.now(),
    },
  ];

  await Promise.all(
    users.map(async (userToCreate) => {
      const createdUser: any = await User.create(userToCreate);
      const user = createdUser.dataValues;

      await Order.create({
        user_id: user.id,
        status: "PaymentSuccess",
        created_at: Date.now(),
      });

      await OrderItem.create({
        order_id: 1,
        product_id: 1,
        created_at: Date.now(),
      });

      await Order.create({
        user_id: user.id,
        status: "PaymentFailed",
        created_at: Date.now(),
      });

      await OrderItem.create({
        order_id: 2,
        product_id: 1,
        created_at: Date.now(),
      });

      await Order.create({
        user_id: user.id,
        status: "Delivered",
        created_at: Date.now(),
      });

      await OrderItem.create({
        order_id: 3,
        product_id: 2,
        created_at: Date.now(),
      });
    })
  );

  await Promise.all(products.map(async (user) => await Product.create(user)));
})();
