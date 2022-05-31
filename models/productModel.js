const { connection } = require('./connection');

exports.list = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return data;
};

exports.getByID = async (id) => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return data[0];
};

exports.create = async ({ name, quantity }) => {
  const [data] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?);`,
    [name, quantity],
  );
  const newProduct = { id: data.insertId, name, quantity };
  return newProduct;
};

exports.getByName = async (name) => {
  const [data] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name = ? LIMIT 1;`,
    [name],
  );
  return data[0];
};
