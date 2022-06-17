const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../../../services/productsService");
const Product = require("../../../../models/productModel");

describe("List products service", () => {
  let productProps = {
    id: 2,
    name: "Traje de encolhimento",
    quantity: 20,
  };

  let stubValue = [productProps];

  let stub;

  beforeEach(async () => {
    stub = sinon.stub(Product, "list").resolves(stubValue);
  });

  afterEach(async () => {
    Product.list.restore();
  });

  it("should call list method in product model", async () => {
    await productService.list();
    expect(stub.calledOnce).to.be.true;
  });

  it("should return products list", async () => {
    const products = await productService.list();
    expect(products).to.be.deep.equal(stubValue);
  });
});
