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
