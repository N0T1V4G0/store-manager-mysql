const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const Product = require("../../../../models/productModel");
const AppError = require("../../../../errors/AppError");

describe("Create new product service", () => {
  describe("When there's no duplicate product", () => {
    let stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    let stub;

    beforeEach(async () => {
      stub = sinon.stub(Product, "create").resolves(stubValue);
      sinon.stub(Product, "getByName").resolves(undefined);
    });

    afterEach(async () => {
      stub.restore();
      Product.getByName.restore();
    });

    it("should return created product", async () => {
      const product = {
        name: "Martelo de Thor",
        quantity: 10,
      };
      const newProduct = await productService.create(product);
      expect(newProduct).to.be.deep.equal(stubValue);
    });
  });

  describe("When there's repeated product name", () => {
    let stubValue = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };

    let stub;

    beforeEach(async () => {
      stub = sinon.stub(Product, "getByName").resolves(stubValue);
    });

    afterEach(async () => {
      Product.getByName.restore();
    });

    const product = {
      name: "Martelo de Thor",
      quantity: 10,
    };

    it("should call getByName method in product model w/ repeated product name", async () => {
      await productService.create(product).catch(() => {
        expect(stub.calledOnceWith(sinon.match(product.name))).to.be.true;
      });
    });

    it("should return an error", async () => {
      await productService.create(product).catch((e) => {
        expect(e).to.be.instanceOf(AppError);
      });
    });

    it("error should have statusCode 404 and correct message", async () => {
      await productService.create(product).catch((e) => {
        expect(e.message).to.be.equal("Product already exists");
        expect(e.statusCode).to.be.equal(409);
      });
    });
  });
});
