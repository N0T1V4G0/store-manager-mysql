const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Product = require("../../../../models/productModel");

describe("Create new product", () => {
  const productPayload = {
    name: "Lança da Alma",
    quantity: 25,
  };

  beforeEach(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  describe("when successful", () => {
    it("should create a new product with id property", async () => {
      const newProduct = await Product.create(productPayload);
      expect(newProduct).to.have.property("id");
    });

    it("should have correct property values", async () => {
      const newProduct = await Product.create(productPayload);
      expect(newProduct.name).to.be.equal(productPayload.name);
      expect(newProduct.quantity).to.be.equal(productPayload.quantity);
    });
  });
});
