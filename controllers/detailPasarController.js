const asyncHandler = require('express-async-handler');
const DetailPasar = require('../models/detailPasarModel')
const Pasar = require('../models/pasarModel')

const createDetailPasar = asyncHandler(async (req, res) => {
    const pasarId = req.params.pasarId;

    const { nama_barang, harga_barang, satuan } = req.body;
    const gambarBarang = req.file ? req.file.filename : null;

    const pasar = await Pasar.findById(pasarId);
    if (!pasar) {
        return res.status(404).json({
            success: false,
            message: 'Pasar tidak ditemukan',
        });
    }

    const detailPasar = await DetailPasar.create({
        pasar: pasarId,
        nama_barang,
        harga_barang,
        satuan,
        gambar_barang: `${process.env.NGROK_URL}/pasar/${gambarBarang}`,
    });

    res.status(201).json({
        success: true,
        data: detailPasar,
        message: 'Detail Pasar berhasil dibuat',
    });
});

const getDetailPasar = asyncHandler(async (req, res) => {
    const detailPasarList = await DetailPasar.find();

    res.status(200).json({
        success: true,
        data: detailPasarList,
        message: 'Daftar detail pasar berhasil diambil',
    });
});

module.exports = {
    createDetailPasar,
    getDetailPasar,
};