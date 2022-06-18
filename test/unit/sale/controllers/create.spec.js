const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../../services/salesService");
const saleController = require("../../../../controllers/salesControllers");

describe("Create sales controller", () => {
  describe("When successful", () => {
    let next;
    let response = {};
    let request = {
      body: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
    const stubValue = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "create").resolves(stubValue);
    });

    afterEach(() => {
      saleService.create.restore();
    });

    it("should return response status code 200", async () => {
      await saleController.create(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("should return JSON w/ array ", async () => {
      await saleController.create(request, response, next);

      expect(response.json.calledWith(stubValue)).to.be.equal(true);
    });
  });

  describe("when service throws an error", () => {
    const response = {};
    const request = {};
    let next;

    const err = Error("service error");

    beforeEach(() => {
      request.body = {};

      next = sinon.stub();
      sinon.stub(saleService, "create").throws(err);
    });

    afterEach(() => {
      saleService.create.restore();
    });

    it("should pass error to next function", async () => {
      await saleController.create(request, response, next);

      sinon.assert.calledWith(next, sinon.match(err));
    });
  });
});
