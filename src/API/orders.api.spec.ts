import request from "supertest";
import { expressInstance } from "../server";
import dotEnv from "dotenv";
import path from "path";

dotEnv.config({ path: path.resolve(__dirname, "../../.env") });

describe("creating orders", function () {
  let server = expressInstance;

  beforeEach(function () {
    server = expressInstance;
  });

  it("expects correct data to create an order", function testSlash(done) {
    request(server)
      .post("/order")
      .send({
        userId: 1,
        items: [
          { productId: 1 },
          { productId: 2 },
          { productId: 3 },
          { productId: 4 },
        ],
      })
      .expect(200, done);
  });

  it("throws an error with wrong data", function testSlash(done) {
    request(server).post("/order").expect(400, done);
  });
});

describe("adding items to an order", function () {
  let server = expressInstance;

  it("expects correct data to update an order", function testSlash(done) {
    request(server)
      .patch(`/order/1`)
      .send({
        productId: 3,
      })
      .expect(200, done);
  });

  it("throws an error with wrong data", function testSlash(done) {
    request(server).patch(`/order/1`).expect(400, done);
  });
});
