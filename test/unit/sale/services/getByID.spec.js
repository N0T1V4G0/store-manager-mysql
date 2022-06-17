const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../../services/salesService");
const Sale = require("../../../../models/saleModel");
const AppError = require("../../../../errors/AppError");

describe("Get sale by ID service", () => {
  describe("when there's no sale", () => {
    let invalidID = -100;
    let stub;

    beforeEach(async () => {
      stub = sinon.stub(Sale, "getByID").resolves([]);
    });

    afterEach(async () => {
      stub.restore();
    });

    it("should call getByID method in sale model w/ invalid id", async () => {
      await saleService.getByID(invalidID).catch(() => {
        expect(stub.calledOnceWith(sinon.match(invalidID))).to.be.true;
      });
    });

    it("should return an error", async () => {
      await saleService.getByID(invalidID).catch((e) => {
        expect(e).to.be.instanceOf(AppError);
      });
    });

    it("error should have statusCode 404 and correct message", async () => {
      await saleService.getByID(invalidID).catch((e) => {
        expect(e.message).to.be.equal("Sale not found");
        expect(e.statusCode).to.be.equal(404);
      });
    });
  });

  describe("when sale is found", () => {
    let stub;
    let saleID = 1;
    let saleProductStub = {
      productId: 1,
      quantity: 5,
      date: "2022-06-18T01:55:31.000Z",
    };

    beforeEach(async () => {
      stub = sinon.stub(Sale, "getByID").resolves([saleProductStub]);
    });

    afterEach(async () => {
      stub.restore();
    });

    it("should return sale's products", async () => {
      const saleProducts = await saleService.getByID(saleID);
      expect(saleProducts).to.be.deep.equal([saleProductStub]);
    });
  });
});
