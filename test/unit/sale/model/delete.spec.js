const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Sale = require("../../../../models/saleModel");

describe("Delete sale model", () => {
  const saleID = 10;

  afterEach(async () => {
    connection.execute.restore();
  });

  it("should call connection.execute", async () => {
    const stub = sinon.stub(connection, "execute").resolves(undefined);
    await Sale.delete(saleID);
    expect(stub.calledOnce).to.be.true;
  });

  it("should return nothing", async () => {
    sinon.stub(connection, "execute").resolves(undefined);
    const sale = await Sale.delete(saleID);
    expect(sale).to.be.undefined;
  });
});
