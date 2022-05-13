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
