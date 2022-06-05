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

exports.registerSaleProduct = async ({ saleId, productId, quantity }) => {
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
  const newSaleProduct = await this.registerSaleProduct({
    saleId,
    productId,
    quantity,
  });
  return newSaleProduct;
};

exports.delete = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?;`,
    [id],
  );
};

exports.checkProductQuantity = async (productId) => {
  const [data] = await connection.execute(
    `SELECT quantity FROM StoreManager.products
    WHERE id = ?;`,
    [productId],
  );
  return data[0].quantity;
};

exports.subtractProductQuantity = async ({ productId, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET quantity = quantity - ?
    WHERE id = ?;`,
    [quantity, productId],
  );
};

exports.restoreProductQuantity = async (sale) => {
  const updatedProductQnt = sale.map(({ productId, quantity }) => connection.execute(
      `UPDATE StoreManager.products
      SET quantity = quantity + ?
      WHERE id = ?;`,
      [quantity, productId],
    ));
  await Promise.all(updatedProductQnt);
};
