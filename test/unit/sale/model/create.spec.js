const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../../models/connection");
const Sale = require("../../../../models/saleModel");

describe("Create new sale model", () => {
  let stub;
  beforeEach(async () => {
    stub = sinon.stub(connection, "execute").resolves([{ insertId: 3 }, []]);
  });

  afterEach(async () => {
    stub.restore();
  });
  it("should return new sale's id", async () => {
    const saleId = await Sale.create();
    console.log(saleId);
    expect(saleId).to.be.an("number");
  });
});
