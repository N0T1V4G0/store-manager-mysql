const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../../services/salesService");
const Sale = require("../../../../models/saleModel");

describe("List sales service", () => {
  let stubSale = {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-06-17T05:01:47.000Z",
  };

  let stubValue = [stubSale];

  let stub;

  beforeEach(async () => {
    stub = sinon.stub(Sale, "list").resolves(stubValue);
  });

  afterEach(async () => {
    Sale.list.restore();
  });

  it("should call list method in sale model", async () => {
    await saleService.list();
    expect(stub.calledOnce).to.be.true;
  });

  it("should return sales list", async () => {
    const sales = await saleService.list();
    expect(sales).to.be.deep.equal(stubValue);
  });
});
