const {pool} = require('../Config/db');

const Transaksi = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM tb_transaksi ORDER BY tanggal DESC');
    return res.rows;
  },

  create: async (data) => {
    const { jenis_makanan, tanggal, total_biaya, jenis_transaksi } = data;
    const res = await pool.query(
      'INSERT INTO tb_transaksi (jenis_makanan, tanggal, total_biaya, jenis_transaksi) VALUES ($1, $2, $3, $4) RETURNING *',
      [jenis_makanan, tanggal, total_biaya, jenis_transaksi]
    );
    return res.rows[0];
  },

  // Filter transaksi berdasarkan tanggal
  findByDate: async (tanggal) => {
    const res = await pool.query('SELECT * FROM tb_transaksi WHERE tanggal = $1', [tanggal]);
    return res.rows;
  }
};

module.exports = Transaksi;