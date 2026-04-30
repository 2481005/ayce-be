const Menu = require('../Models/MenuModel');

exports.getAllMenu = async (req, res) => {
    try {
        const data = await Menu.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMenu = async (req, res) => {
    try {
        console.log("masuk")
        const newMenu = await Menu.create(req.body);
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        // Menggunakan parameter 'team' karena di DDL tidak ada ID primary key
        const updated = await Menu.updateByTeam(req.params.team, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMenu = async (req, res) => {
    try {
        await Menu.deleteByTeam(req.params.team);
        res.json({ message: "Menu berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};