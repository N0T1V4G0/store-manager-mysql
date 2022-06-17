const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Sale = require("../../../../models/saleModel");

describe("List sales model", () => {
  describe("When there's no sales in db", () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return empty array", async () => {
      const stubValue = [[], []];
      const stub = sinon.stub(connection, "execute").resolves(stubValue);
      const results = await Sale.list();
      expect(stub.calledOnce).to.be.true;
      expect(results).to.be.an("array");
      expect(results).to.be.empty;
    });
  });

  describe("When there's sales in db", () => {
    const stubValue = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-06-17T05:01:47.000Z",
      },
    ];

    beforeEach(async () => {
      const results = [stubValue, []];
      sinon.stub(connection, "execute").resolves(results);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return an array objects", async () => {
      const results = await Sale.list();
      console.log(results);
      expect(results).to.be.an("array");
      expect(results).not.to.be.empty;
      results.forEach((r) => expect(r).to.be.an("object"));
    });

    it("each sale object must have correct keys", async () => {
      const results = await Sale.list();
      results.forEach((r) =>
        expect(r).to.include.all.keys("saleId", "productId", "date", "quantity")
      );
    });
  });
});
