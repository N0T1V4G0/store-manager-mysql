const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const Product = require("../../../../models/productModel");
const AppError = require("../../../../errors/AppError");

describe("Get product by id service", () => {
  describe("when product is found", () => {
    let stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };
    let stub;

    beforeEach(async () => {
      stub = sinon.stub(Product, "getByID").resolves(stubValue);
    });

    afterEach(async () => {
      Product.getByID.restore();
    });

    it("should call getByID method in product model w/ correct id", async () => {
      await productService.getByID(stubValue.id);
      expect(stub.calledOnceWith(sinon.match(stubValue.id))).to.be.true;
    });

    it("should return product", async () => {
      const product = await productService.getByID(stubValue.id);
      expect(product).to.be.deep.equal(stubValue);
    });
  });

  describe("when there's no product", () => {
    let invalidID = -100;
    let stub;

    beforeEach(async () => {
      stub = sinon.stub(Product, "getByID").resolves(undefined);
    });

    afterEach(async () => {
      stub.restore();
    });

    it("should call getByID method in product model w/ invalid id", async () => {
      await productService.getByID(invalidID).catch(() => {
        expect(stub.calledOnceWith(sinon.match(invalidID))).to.be.true;
      });
    });

    it("should return an error", async () => {
      await productService.getByID(invalidID).catch((e) => {
        expect(e).to.be.instanceOf(AppError);
      });
    });

    it("error should have statusCode 404 and correct message", async () => {
      await productService.getByID(invalidID).catch((e) => {
        expect(e.message).to.be.equal("Product not found");
        expect(e.statusCode).to.be.equal(404);
      });
    });
  });
});
