const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Product = require("../../../../models/productModel");

describe("List products", () => {
  describe("when there's no products in db", () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return empty array", async () => {
      const stubValue = [[], []];
      const stub = sinon.stub(connection, "execute").resolves(stubValue);
      const results = await Product.list();
      expect(stub.calledOnce).to.be.true;
      expect(results).to.be.an("array");
      expect(results).to.be.empty;
    });
  });

  describe("when there's products in db", () => {
    const stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    beforeEach(async () => {
      const results = [[stubValue], []];
      sinon.stub(connection, "execute").resolves(results);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return an array objects", async () => {
      const results = await Product.list();
      expect(results).to.be.an("array");
      expect(results).not.to.be.empty;
      results.forEach((r) => expect(r).to.be.an("object"));
    });

    it("each product object must have correct keys", async () => {
      const results = await Product.list();
      expect(results).to.be.an("array");
      results.forEach((r) =>
        expect(r).to.include.all.keys("id", "name", "quantity")
      );
    });
  });
});
