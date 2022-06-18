const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const productControllers = require("../../../../controllers/productsControllers");

describe("Delete product controller", () => {
  describe("When successful", () => {
    let next;
    let response = {};
    let request = { params: { id: 1 } };
    const stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productService, "delete").resolves();
    });

    afterEach(() => {
      productService.delete.restore();
    });

    it("should return response status code 204", async () => {
      await productControllers.delete(request, response, next);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it("should close response", async () => {
      await productControllers.delete(request, response, next);

      expect(response.send.calledOnce).to.be.true;
    });
  });

  describe("when service throws an error", () => {
    const response = {};
    const request = {};
    let next;

    const err = Error("service error");

    beforeEach(() => {
      request.params = { id: 1 };

      next = sinon.stub();
      sinon.stub(productService, "delete").throws(err);
    });

    afterEach(() => {
      productService.delete.restore();
    });

    it("should pass error to next function", async () => {
      await productControllers.delete(request, response, next);

      sinon.assert.calledWith(next, sinon.match(err));
    });
  });
});
