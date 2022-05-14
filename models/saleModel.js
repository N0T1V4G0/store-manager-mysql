const { connection } = require('./connection');

exports.list = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );

  return data;
};