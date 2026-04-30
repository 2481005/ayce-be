const Meja = require('../Models/MejaModel');

exports.getAllMeja = async (req, res) => {
    try {
        const data = await Meja.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMeja = async (req, res) => {
    try {
        const newMeja = await Meja.create(req.body);
        res.status(201).json(newMeja);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMeja = async (req, res) => {
    try {
        const updated = await Meja.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMeja = async (req, res) => {
    try {
        await Meja.delete(req.params.id);
        res.json({ message: "Meja berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};