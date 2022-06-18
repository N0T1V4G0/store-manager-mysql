const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const productControllers = require("../../../../controllers/productsControllers");

describe("List sales controller", () => {
  describe("When successful", () => {
    let next;
    let response = {};
    let request = {};
    const stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "list").resolves([stubValue]);
    });

    afterEach(() => {
      productService.list.restore();
    });

    it("should return response status code 200", async () => {
      await productControllers.list(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("should return JSON w/ array ", async () => {
      await productControllers.list(request, response, next);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
