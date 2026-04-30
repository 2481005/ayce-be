const {pool} = require('../Config/db');

const Menu = {
  findAll: async () => {
    try{
      const res = await pool.query('SELECT * FROM tb_menu_makanan');
      return res.rows;
    }catch(err){
      console.log(err)
    }
  },

  create: async (data) => {

    try{
      console.log("masuk")
      const { team, self_reward, vegetarian, kids } = data;
      const res = await pool.query(
        'INSERT INTO tb_menu_makanan (team, self_reward, vegetarian, kids) VALUES ($1, $2, $3, $4) RETURNING *',
        [team, self_reward, vegetarian, kids]
      );
      return res.rows[0];
    }catch(err){
      console.log(err)
    }
  },

  // Update berdasarkan nama team
  updateByTeam: async (teamName, data) => {
    const { self_reward, vegetarian, kids } = data;
    const res = await pool.query(
      'UPDATE tb_menu_makanan SET self_reward = $1, vegetarian = $2, kids = $3 WHERE team = $4 RETURNING *',
      [self_reward, vegetarian, kids, teamName]
    );
    return res.rows[0];
  },

  deleteByTeam: async (teamName) => {
    await pool.query('DELETE FROM tb_menu_makanan WHERE team = $1', [teamName]);
    return { message: "Menu deleted successfully" };
  }
};

module.exports = Menu;