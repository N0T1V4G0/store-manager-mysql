const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../../services/salesService");
const Sale = require("../../../../models/saleModel");
const AppError = require("../../../../errors/AppError");

describe("Delete sale service", () => {
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
      await saleService.delete(invalidID).catch(() => {
        expect(stub.calledOnceWith(sinon.match(invalidID))).to.be.true;
      });
    });

    it("should return an error", async () => {
      await saleService.delete(invalidID).catch((e) => {
        expect(e).to.be.instanceOf(AppError);
      });
    });

    it("error should have statusCode 404 and correct message", async () => {
      await saleService.delete(invalidID).catch((e) => {
        expect(e.message).to.be.equal("Sale not found");
        expect(e.statusCode).to.be.equal(404);
      });
    });
  });

  describe("when sale is found", () => {
    let getByIDstub, restoreStub, deleteStub;

    let saleID = 1;

    let saleProductStub = {
      productId: 1,
      quantity: 5,
      date: "2022-06-18T01:43:12.000Z",
    };

    beforeEach(async () => {
      getByIDstub = sinon.stub(Sale, "getByID").resolves([saleProductStub]);
      restoreStub = sinon
        .stub(Sale, "restoreProductQuantity")
        .resolves(undefined);
      deleteStub = sinon.stub(Sale, "delete").resolves(undefined);
    });

    afterEach(async () => {
      getByIDstub.restore();
      restoreStub.restore();
      deleteStub.restore();
    });

    it("should restore product quantity in db", async () => {
      await saleService.delete(saleID);
      expect(restoreStub.calledOnceWith(sinon.match([saleProductStub]))).to.be
        .true;
    });

    it("should delete sale from db", async () => {
      await saleService.delete(saleID);
      expect(deleteStub.calledOnceWith(sinon.match(saleID))).to.be.true;
    });
  });
});
