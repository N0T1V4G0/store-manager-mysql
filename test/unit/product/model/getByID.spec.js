const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Product = require("../../../../models/productModel");

describe("Get product by id", () => {
  describe("when successful", () => {
    const stubValue = {
      id: 1,
      name: "A Porta da Esperança",
      quantity: 30,
    };

    beforeEach(async () => {
      const results = [[stubValue], []];
      sinon.stub(connection, "execute").resolves(results);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return an object", async () => {
      const product = await Product.getByID(stubValue.id);
      expect(product).to.be.an("object");
    });

    it("should return correct object properties", async () => {
      const product = await Product.getByID(stubValue.id);
      expect(product).to.include.all.keys("id", "name", "quantity");
    });

    it("should return correct product", async () => {
      const product = await Product.getByID(stubValue.id);
      expect(product.id).to.be.equal(stubValue.id);
      expect(product.name).to.be.equal(stubValue.name);
      expect(product.quantity).to.be.equal(stubValue.quantity);
    });
  });

  describe("when no product is found", () => {
    beforeEach(async () => {
      const results = [[], []];
      sinon.stub(connection, "execute").resolves(results);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("returns undefined", async () => {
      const product = await Product.getByID(-1);
      expect(product).to.be.undefined;
    });
  });
});
