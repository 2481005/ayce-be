const {pool} = require('../Config/db');

const User = {
  findAll: async () => {
    const res = await pool.query('SELECT userid, nama, email, nomor_hp FROM tb_user ORDER BY userid ASC');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT userid, nama, email, nomor_hp FROM tb_user WHERE userid = $1', [id]);
    return res.rows[0];
  },

  findByEmail: async (email) => {
    const res = await pool.query('SELECT * FROM tb_user WHERE email = $1', [email]);
    return res.rows[0];
  },

  create: async (data) => {
    const { nama, email, nomor_hp, password } = data;
    const res = await pool.query(
      'INSERT INTO tb_user (nama, email, nomor_hp, password) VALUES ($1, $2, $3, $4) RETURNING userid, nama, email',
      [nama, email, nomor_hp, password]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { nama, email, nomor_hp } = data;
    const res = await pool.query(
      'UPDATE tb_user SET nama = $1, email = $2, nomor_hp = $3 WHERE userid = $4 RETURNING *',
      [nama, email, nomor_hp, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM tb_user WHERE userid = $1', [id]);
    return { message: "User deleted successfully" };
  }
};

module.exports = User;