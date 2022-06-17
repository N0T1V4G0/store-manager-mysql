const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Product = require("../../../../models/productModel");

describe("Delete a product", () => {
  const productID = 10;

  afterEach(async () => {
    connection.execute.restore();
  });

  it("should call connection.execute", async () => {
    const stub = sinon.stub(connection, "execute").resolves(undefined);
    await Product.delete(productID);
    expect(stub.calledOnce).to.be.true;
  });

  it("should return nothing", async () => {
    sinon.stub(connection, "execute").resolves(undefined);
    const product = await Product.delete(productID);
    expect(product).to.be.undefined;
  });
});
