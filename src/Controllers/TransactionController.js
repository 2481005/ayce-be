const Transaksi = require('../Models/TransactionModel');

exports.getAllTransaksi = async (req, res) => {
    try {
        const data = await Transaksi.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTransaksi = async (req, res) => {
    try {
        const newTransaksi = await Transaksi.create(req.body);
        res.status(201).json(newTransaksi);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTransaksiByDate = async (req, res) => {
    try {
        const { tanggal } = req.params; // format: YYYY-MM-DD
        const data = await Transaksi.findByDate(tanggal);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};