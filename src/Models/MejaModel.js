const {pool} = require('../Config/db');

const Meja = {
  findAll: async () => {
    try {
      const res = await pool.query('SELECT * FROM tb_meja ORDER BY nomor_meja ASC');

      return res.rows;
    } catch (err) {
      console.error("❌ ERROR QUERY DATABASE:", err.message); // Ini akan memunculkan pesan error di terminal
      throw err; // Lempar error ke Controller
    }


  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM tb_meja WHERE id_meja = $1', [id]);
    return res.rows[0];
  },

  create: async (data) => {
    const { nomor_meja, kapasitas, jumlah_kursi } = data;
    const res = await pool.query(
      'INSERT INTO tb_meja (nomor_meja, kapasitas, jumlah_kursi) VALUES ($1, $2, $3) RETURNING *',
      [nomor_meja, kapasitas, jumlah_kursi]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { nomor_meja, kapasitas, jumlah_kursi } = data;
    const res = await pool.query(
      'UPDATE tb_meja SET nomor_meja = $1, kapasitas = $2, jumlah_kursi = $3 WHERE id_meja = $4 RETURNING *',
      [nomor_meja, kapasitas, jumlah_kursi, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM tb_meja WHERE id_meja = $1', [id]);
    return { message: "Meja deleted successfully" };
  }
};

module.exports = Meja;