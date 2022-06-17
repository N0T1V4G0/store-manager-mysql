const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Sale = require("../../../../models/saleModel");

describe("Get sale by id model", () => {
  describe("When successful", () => {
    const stubValue = {
      productId: 3,
      quantity: 15,
      date: "2022-06-17T05:24:26.000Z",
    };

    let stub;

    beforeEach(async () => {
      stub = sinon.stub(connection, "execute").resolves([[stubValue], []]);
    });

    afterEach(async () => {
      stub.restore();
    });

    it("should return an array of objects", async () => {
      const saleData = await Sale.getByID(2);
      expect(saleData).to.be.an("array");
      expect(saleData).to.not.be.empty;
      saleData.forEach((r) => expect(r).to.be.an("object"));
    });

    it("each object should have correct properties", async () => {
      const saleData = await Sale.getByID(2);
      saleData.forEach((r) =>
        expect(r).to.be.include.all.keys("productId", "quantity", "date")
      );
    });
  });

  describe("When there's no sale", () => {
    let stub;

    beforeEach(async () => {
      stub = sinon.stub(connection, "execute").resolves([[], []]);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it("should return empty array", async () => {
      const saleData = await Sale.getByID(2);
      expect(stub.calledOnce).to.be.true;
      expect(saleData).to.be.an("array");
      expect(saleData).to.be.empty;
    });
  });
});
