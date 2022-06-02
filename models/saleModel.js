const { connection } = require('./connection');

exports.list = async () => {
  const [data] = await connection.execute(
    `SELECT sales_products.sale_id AS saleId, sales_products.product_id AS productId,
    sales_products.quantity, sales.date
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON sales_products.sale_id = sales.id`,
  );

  return data;
};

exports.getByID = async (id) => {
  const [data] = await connection.execute(
    `SELECT sales_products.product_id AS productId,
    sales_products.quantity, sales.date
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON sales_products.sale_id = sales.id
    WHERE sale_id = ?;`,
    [id],
  );

  return data;
};

exports.create = async () => {
  const [data] = await connection.execute(
    `INSERT INTO StoreManager.sales (id)
    VALUES (null);`,
  );
  return data.insertId;
};

exports.registerSaleProducts = async ({ saleId, productId, quantity }) => {
  const [data] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
  return data[0];
};

exports.update = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?;`,
    [saleId],
  );
  const newSaleProducts = await this.registerSaleProducts({ saleId, productId, quantity });
  return newSaleProducts;
};

exports.delete = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?;`,
    [id],
  );
};