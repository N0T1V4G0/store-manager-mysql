const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const productControllers = require("../../../../controllers/productsControllers");

describe("Create new product controller", () => {
  describe("When successful", () => {
    let next;
    let response = {};
    let request = { body: { name: "Martelo de Thor", quantity: 10 } };
    const stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "create").resolves(stubValue);
    });

    afterEach(() => {
      productService.create.restore();
    });

    it("should return response status code 201", async () => {
      await productControllers.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("should return JSON w/ new product", async () => {
      await productControllers.create(request, response, next);

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
      sinon.stub(productService, "create").throws(err);
    });

    afterEach(() => {
      productService.create.restore();
    });

    it("should pass error to next function", async () => {
      await productControllers.create(request, response, next);

      sinon.assert.calledWith(next, sinon.match(err));
    });
  });
});
