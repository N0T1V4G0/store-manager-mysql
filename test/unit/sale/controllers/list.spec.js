const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../../services/salesService");
const saleController = require("../../../../controllers/salesControllers");

describe("List sales controller", () => {
  describe("When successful", () => {
    let response = {};
    let request = {};
    let next;
    const stubValue = {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: "2022-06-18T17:42:57.000Z",
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "list").resolves([stubValue]);
    });

    afterEach(() => {
      saleService.list.restore();
    });

    it("should return response status code 200", async () => {
      await saleController.list(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("should return JSON w/ array ", async () => {
      await saleController.list(request, response, next);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
